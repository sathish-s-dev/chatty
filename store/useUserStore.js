import { create } from 'zustand';

export const useUserStore = create((set) => ({
	user: 'sathish',
	userId: '',
	setUser: (user) =>
		set((state) => {
			return {
				user,
			};
		}),
	setUserId: (userId) =>
		set((state) => {
			return {
				userId,
			};
		}),
}));
