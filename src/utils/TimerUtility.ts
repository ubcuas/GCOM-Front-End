export default class TimerUtility {
    public static getExpiryInSeconds(seconds: number) {
        const time = new Date();
        time.setSeconds(time.getSeconds() + seconds);
        return time;
    }
}
