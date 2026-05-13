import OpenAI from 'openai'

function getFreeClient(): OpenAI {
  return new OpenAI({
    apiKey: process.env.NVIDIA_API_KEY || 'placeholder',
    baseURL: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',
  })
}

function getClient() {
  const client = getFreeClient()
  const model = process.env.AI_MODEL || 'nvidia/nvidia/nemotron-3-super-120b-a12b'
  return { client, model }
}

export async function generateVideoContent(
  topic: string,
  style: string,
  goal: string
) {
  const { client, model } = getClient()

  const prompt = `你是一个专业短视频爆款内容策划师，擅长抖音和TikTok增长。

请根据以下信息生成一个完整短视频方案：

主题：${topic}
风格：${style}
目标：${goal}

要求输出：

1. 爆款视频脚本（必须包含强钩子+冲突+反转+结尾引导）
2. 分镜头脚本（至少6个镜头）
3. 配音稿（适合TTS朗读）
4. 10个吸引点击的标题
5. 15个热门标签（hashtags）

要求：
- 内容必须适合社交媒体传播
- 开头3秒必须强钩子
- 语言简洁有冲击力
- 可直接用于短视频制作

请按以下JSON格式返回：
{
  "script": "完整视频脚本...",
  "storyboard": ["镜头1: ...", "镜头2: ..."],
  "voiceover": "配音稿全文...",
  "titles": ["标题1", "标题2"],
  "hashtags": ["#tag1", "#tag2"]
}`

  const completion = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: '你是一个专业的短视频内容策划专家。请始终以JSON格式回复。不要包含任何markdown代码块标记，直接输出JSON。' },
      { role: 'user', content: prompt },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) {
    throw new Error('AI 返回为空')
  }

  return JSON.parse(content)
}
