import {
    calculateAmount,
    calculateTotalAmount,
    calculateVolumeCredits,
    Performance,
    PerformanceSummary,
    Play
} from "./performanceCalculator";

export type Statement = {
    customer: string;
    totalAmountInUSD: string;
    totalCreditsEarned: number;
    statementLines: StatementLine[];
};
export type StatementLine = {
    playName: string;
    audience: number;
    amountInUSD: string;
};

export function statementCalculation(summary: PerformanceSummary, plays: Record<string, Play>): Statement {
    return {
        customer: summary.customer,
        totalAmountInUSD: formatAsUSD(calculateTotalAmount(summary, plays)),
        totalCreditsEarned: calculateVolumeCredits(summary, plays),
        statementLines: summary.performances.map(perf => statementLineCalculation(perf, plays))
    };
}

function statementLineCalculation(perf: Performance, plays: Record<string, Play>): StatementLine {
    const play = plays[perf.playID];
    return {
        playName: play.name,
        amountInUSD: formatAsUSD(calculateAmount(play, perf)),
        audience: perf.audience
    };
}

function formatAsUSD(thisAmount: number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
    }).format(thisAmount / 100);
}