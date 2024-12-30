export type Play = {
    name: string;
    type: string;
};
export type Performance = {
    playID: string;
    audience: number;
};
export type PerformanceSummary = {
    customer: string;
    performances: Performance[];
};

export function calculateTotalAmount(summary: PerformanceSummary, plays: Record<string, Play>) {
    return summary.performances
        .map(perf => calculateAmount(plays[perf.playID], perf))
        .reduce((acc, cur) => acc + cur, 0);
}

export function calculateAmount(play: Play, performance: Performance) {
    let totalAmount = 0;
    switch (play.type) {
        case "tragedy":
            totalAmount = 40000;
            if (performance.audience > 30) {
                totalAmount += 1000 * (performance.audience - 30);
            }
            break;
        case "comedy":
            totalAmount = 30000;
            if (performance.audience > 20) {
                totalAmount += 10000 + 500 * (performance.audience - 20);
            }
            totalAmount += 300 * performance.audience;
            break;
        default:
            throw new Error(`unknown type: ${play.type}`);
    }
    return totalAmount;
}

export function calculateCreditsFor(play: Play, perf: Performance) {
    let baseCredits = Math.max(perf.audience - 30, 0);
    let extraComedyCredits = Math.floor(perf.audience / 5);
    return ("comedy" === play.type)
        ? baseCredits + extraComedyCredits
        : baseCredits;
}

export function calculateVolumeCredits(summary: PerformanceSummary, plays: Record<string, Play>) {
    return summary.performances
        .map(perf => calculateCreditsFor(plays[perf.playID], perf))
        .reduce((acc, cur) => acc + cur, 0);
}