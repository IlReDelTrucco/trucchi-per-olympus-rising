/**
 * timerHelper - Simple Countdown Timer Utility
 * Author: IlReDelTrucco
 * License: Custom
 */

class timerHelper {
    /**
     * Initializes the countdown timer.
     * @param {number} seconds - Duration in seconds.
     * @param {Function} onTick - Callback called every second.
     * @param {Function} onEnd - Callback called when countdown ends.
     */
    constructor(seconds, onTick, onEnd) {
        if (typeof seconds !== 'number' || seconds <= 0) {
            throw new Error('[timerHelper] Invalid countdown duration.');
        }
        this.remaining = seconds;
        this.onTick = typeof onTick === 'function' ? onTick : () => {};
        this.onEnd = typeof onEnd === 'function' ? onEnd : () => {};
        this.intervalId = null;
    }

    /**
     * Starts the countdown.
     */
    start() {
        if (this.intervalId) return;
        this.onTick(this.remaining);
        this.intervalId = setInterval(() => {
            this.remaining--;
            if (this.remaining > 0) {
                this.onTick(this.remaining);
            } else {
                this.stop();
                this.onEnd();
            }
        }, 1000);
    }

    /**
     * Stops the countdown.
     */
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }
}

// Example usage:
// const timer = new timerHelper(5, 
//     (sec) => console.log(`Remaining: ${sec}s`), 
//     () => console.log('Time is up!')
// );
// timer.start();

module.exports = timerHelper;
