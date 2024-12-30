export enum PlayType {
    Tragedy = "tragedy",
    Comedy  = "comedy"
}

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
    const IsNotValidPlayType = play.type != PlayType.Tragedy && play.type != PlayType.Comedy;
    if(IsNotValidPlayType) 
         throw new Error(`unknown type: ${play.type}`);
    
    if (play.type === PlayType.Tragedy) {
        return calculateAmountForTragedy(performance);
    }
    if (play.type === PlayType.Comedy) {
        return calculateAmountForComedy(performance);
    }
    return 0;
}
const calculateAmountForTragedy = (performance: Performance) => {
    let totalAmount = 40000;
    if (performance.audience > 30) {
        totalAmount += 1000 * (performance.audience - 30);
    }
    return totalAmount;
}
const calculateAmountForComedy = (performance: Performance) => {
    let totalAmount = 30000;
    if (performance.audience > 20) {
        totalAmount += 10000 + 500 * (performance.audience - 20);
    }
    totalAmount += 300 * performance.audience;
    return totalAmount;
}
export function calculateVolumeCredits(summary: PerformanceSummary, plays: Record<string, Play>) {
    return summary.performances
        .map(perf => calculateCreditsFor(plays[perf.playID], perf))
        .reduce((acc, cur) => acc + cur, 0);
}
function calculateCreditsFor(play: Play, perf: Performance) {
    let baseCredits = Math.max(perf.audience - 30, 0);
    let extraComedyCredits = Math.floor(perf.audience / 5);
    return ("comedy" === play.type)
        ? baseCredits + extraComedyCredits
        : baseCredits;
}
