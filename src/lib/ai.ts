import OpenAI from 'openai'

let client: OpenAI | null = null

function getClient() {
  if (!client) {
    client = new OpenAI({
      baseURL: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',
      apiKey: process.env.NVIDIA_API_KEY || '',
    })
  }
  return client
}

const MODEL = process.env.AI_MODEL || 'minimaxai/minimax-m2.7'

export async function generateVideoContent(
  topic: string,
  style: string,
  goal: string
) {
  const prompt = `你是一个专业短视频爆款内容策划师，擅长抖音和TikTok增长。

请根据以下信息生成一个完整短视频方案：

主题：${topic}
风格：${style}
目标：${goal}

要求输出：
1. 爆款视频脚本（包含强钩子+冲突+反转+结尾引导）
2. 分镜头脚本（至少6个镜头）
3. 配音稿
4. 10个吸引点击的标题
5. 15个热门标签

请按以下JSON格式回复（不要markdown代码块）：
{"script":"...","storyboard":["..."],"voiceover":"...","titles":["..."],"hashtags":["#..."]}`

  const completion = await getClient().chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: '你是一个专业的短视频内容策划专家。始终以JSON格式回复。' },
      { role: 'user', content: prompt },
    ],
    temperature: 1,
    top_p: 0.95,
    max_tokens: 8192,
  })

  const content = completion.choices[0]?.message?.content
  if (!content) throw new Error('AI returned empty')
  const cleaned = content.replace(/```json?/g, '').replace(/```/g, '').trim()
  return JSON.parse(cleaned)
}
