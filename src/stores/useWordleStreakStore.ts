import { defineStore } from "pinia";

export const useWordleStreakStore = defineStore("wordleStreak", {
  state: () => ({
    streakData: [] as Date[],
    displayCalendar: false,
  }),
  actions: {
    loadFromLocalStorage() {
      const storedData = localStorage.getItem("wordleStreak");
      this.streakData = storedData
        ? JSON.parse(storedData).map((data: string) => new Date(data))
        : [];

    },
    updateStreak(date: Date) {
      this.streakData.push(new Date(date));
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("wordleStreak", JSON.stringify(this.streakData));
    },
    activateStreak() {
      this.displayCalendar = true;
    },
    toggleStreak() {
      this.displayCalendar = !this.displayCalendar;
    }
  },
});
