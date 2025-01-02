export interface ListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: "primary" | "success" | "info" | "warning" | "danger"
  extra?: string
}

export const notifyData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "一个人的独白",
    datetime: "0 day",
    description:
      "我有时候非常健谈，能做出明智又果断的评论；有时候，明明内心激动万分，但当我想要发言的时候，想说的话又消失得无影无踪"
  }
]

export const messageData: ListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "想对自己说",
    description: "如果再也不能见到你，祝你早安、午安和晚安",
    datetime: "1984"
  }
]

export const todoData: ListItem[] = [
  {
    title: "吃早餐",
    description: "我每天都要吃早餐",
    extra: "进行中",
    status: "info"
  },
  {
    title: "照顾好我的孩子",
    description: "这家伙很懒，什么都没留下",
    extra: "进行中",
    status: "primary"
  },
  {
    title: "出去旅行",
    description: "这家伙很懒，什么都没留下",
    extra: "未开始",
    status: "danger"
  }
]
