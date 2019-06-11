export interface FriendsList {
  data: Array<{
    id: string,
    name: string,
    picture: {
      data: {
        height: number,
        is_silhouette: boolean,
        url: string,
        width: number,
      }
    }
  }>,
  paging: {
    cursors: {
      after: string,
      before: string,
    }
  },
  summary: {
    total_count: number,
  },
}
