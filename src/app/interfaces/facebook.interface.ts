export interface FriendsList {
  data: Array<FacebookUser>;
  paging: {
    cursors: {
      after: string,
      before: string,
    }
  };
  summary: {
    total_count: number,
  };
}

export interface FacebookUser {
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
}
