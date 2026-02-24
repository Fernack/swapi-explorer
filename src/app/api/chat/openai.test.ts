import { describe, it, expect, vi, beforeEach } from 'vitest';
import { callOpenAIWithTools } from './openai';
import { searchSwapi } from './searchSwapi';

const chatCompletionsCreate = vi.fn();
const searchSwapiMock = vi.mocked(searchSwapi);

vi.mock('openai', () => {
  return {
    default: class {
      chat: any;
      constructor(..._args: any[]) {
        this.chat = {
          completions: {
            create: chatCompletionsCreate,
          },
        };
      }
    },
  };
});

vi.mock('./searchSwapi', () => ({
  searchSwapi: vi.fn(),
}));

describe('callOpenAIWithTools', () => {
  beforeEach(() => {
    chatCompletionsCreate.mockReset();
    searchSwapiMock.mockReset();
  });

  it('returns direct model answer when no tool_calls are present', async () => {
    chatCompletionsCreate.mockResolvedValueOnce({
      choices: [
        {
          message: {
            role: 'assistant',
            content: 'Simple answer',
            tool_calls: undefined,
          },
        },
      ],
    });

    const res = await callOpenAIWithTools('Hi', []);
    const body = await res.json();

    expect(chatCompletionsCreate).toHaveBeenCalledTimes(1);
    expect(body).toEqual({
      reply: 'Simple answer',
      model: 'gpt-4o-mini',
    });
    expect(searchSwapiMock).not.toHaveBeenCalled();
  });

  it('calls searchSwapi and performs a second model call when tool_call is present', async () => {
    // First completion: tool call requesting search_swapi
    chatCompletionsCreate
      .mockResolvedValueOnce({
        choices: [
          {
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: 'tool_call_1',
                  type: 'function',
                  function: {
                    name: 'search_swapi',
                    arguments: JSON.stringify({ resource: 'people', query: 'Luke Skywalker' }),
                  },
                },
              ],
            },
          },
        ],
      })
      // Second completion: final answer using tool result
      .mockResolvedValueOnce({
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'Final answer using SWAPI data.',
            },
          },
        ],
      });

    searchSwapiMock.mockResolvedValueOnce({
      count: 1,
      results: [{ name: 'Luke Skywalker' }],
    });

    const res = await callOpenAIWithTools('Who is Luke?', []);
    const body = await res.json();

    expect(chatCompletionsCreate).toHaveBeenCalledTimes(2);
    expect(searchSwapiMock).toHaveBeenCalledWith('people', 'Luke Skywalker');
    expect(body).toEqual({
      reply: 'Final answer using SWAPI data.',
      model: 'gpt-4o-mini',
    });
  });

  it('returns fallback when tool call arguments are invalid JSON', async () => {
    chatCompletionsCreate.mockResolvedValueOnce({
      choices: [
        {
          message: {
            role: 'assistant',
            content: null,
            tool_calls: [
              {
                id: 'tool_call_1',
                type: 'function',
                function: {
                  name: 'search_swapi',
                  arguments: '{invalid-json}',
                },
              },
            ],
          },
        },
      ],
    });

    const res = await callOpenAIWithTools('Question', []);
    const body = await res.json();

    expect(body).toEqual({
      reply: 'Invalid tool arguments',
      model: 'fallback',
    });
    expect(searchSwapiMock).not.toHaveBeenCalled();
    expect(chatCompletionsCreate).toHaveBeenCalledTimes(1);
  });

  it('returns fallback when searchSwapi returns no data', async () => {
    chatCompletionsCreate
      .mockResolvedValueOnce({
        choices: [
          {
            message: {
              role: 'assistant',
              content: null,
              tool_calls: [
                {
                  id: 'tool_call_1',
                  type: 'function',
                  function: {
                    name: 'search_swapi',
                    arguments: JSON.stringify({ resource: 'planets', query: 'Unknown' }),
                  },
                },
              ],
            },
          },
        ],
      })
      // This second call should not be reached because toolResult is falsy
      .mockResolvedValueOnce({
        choices: [
          {
            message: {
              role: 'assistant',
              content: 'This should not be used',
            },
          },
        ],
      });

    searchSwapiMock.mockResolvedValueOnce(null);

    const res = await callOpenAIWithTools('Question', []);
    const body = await res.json();

    expect(body).toEqual({
      reply: 'No data found for planets \"Unknown\"',
      model: 'fallback',
    });
    expect(searchSwapiMock).toHaveBeenCalledWith('planets', 'Unknown');
    expect(chatCompletionsCreate).toHaveBeenCalledTimes(1);
  });
});

