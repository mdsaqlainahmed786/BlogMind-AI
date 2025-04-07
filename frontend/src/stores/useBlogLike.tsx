import { create } from "zustand";



interface BlogLikeState {
    likedByUser: boolean;
    setLikedByUser: (likedByUser: boolean) => void;
    clearLikedByUser: () => void;
}

export const useBlogLike = create<BlogLikeState>((set) => ({
    likedByUser: false,
    setLikedByUser: (likedByUser) => set({ likedByUser }),
    clearLikedByUser: () => set({ likedByUser: false }),
}));
