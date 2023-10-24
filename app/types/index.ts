export type Ticket = {
  ticket: {
    title: string,
    description: string,
    category: string,
    createdAt: Date,
    creator: string,
    comments: string[],
    progress: string,
  }
}