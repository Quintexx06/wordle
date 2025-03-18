import { defineStore } from "pinia";

export const useWordleStreakStore = defineStore("wordleStreak", {
  state: () => ({
    streakData: [] as Date[],
    displayCalendar: false as boolean,
    playedFirstGameToday: [new Date(), false] as [Date, boolean],
  }),
  actions: {
    loadFromLocalStorage() {
      const storedData = localStorage.getItem("wordleStreak");
      if(storedData) {
        this.streakData = JSON.parse(storedData).map((data: string) => new Date(data));
      } else{
        this.streakData = [];
      }

      const storedPlayedGame = localStorage.getItem("playedFirstGameToday");
      if (storedPlayedGame) {
        const storedPlayedGameArr = JSON.parse(storedPlayedGame);
        this.playedFirstGameToday = [new Date(storedPlayedGameArr[0]), storedPlayedGameArr[1]];
      }

    },
    updateStreak(date: Date) {
      const newDate = new Date(date);
      newDate.setHours(0,0,0,0);
      this.streakData.push(newDate);
      this.saveToLocalStorage();
    },
    saveToLocalStorage() {
      localStorage.setItem("wordleStreak", JSON.stringify(this.streakData));
      localStorage.setItem("playedFirstGameToday", JSON.stringify(this.playedFirstGameToday));

    },
    activateStreak() {
      this.displayCalendar = true;
    },
    toggleStreak() {
      this.displayCalendar = !this.displayCalendar;
    },
    handleFirstGameOfTheDay(playedJustNow: boolean = false) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const lastPlayedDate = new Date(this.playedFirstGameToday[0]);
      lastPlayedDate.setHours(0, 0, 0, 0);

      if (lastPlayedDate.getTime() < today.getTime()) {
        this.playedFirstGameToday = [today, false];
      }

      if(playedJustNow) {
        this.playedFirstGameToday[1] = true;
      }

      this.saveToLocalStorage();
    }

  },
});
