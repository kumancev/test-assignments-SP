export type AlbumType = {
  userId?: number;
  id: string;
  title: string;
  photos?: PhotoType[];
};

export type PhotoType = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
