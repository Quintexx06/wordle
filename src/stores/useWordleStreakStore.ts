import { defineStore } from "pinia";

export const useWordleStreakStore = defineStore("wordleStreak", {
  state: () => ({
    streakData: JSON.parse(localStorage.getItem("wordleStreak") || "[]").map((data: string) => new Date(data)),
    displayCalendar: true,
  }),
  actions: {
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
    disableStreak() {
      this.displayCalendar = false;
    }
  },
});
