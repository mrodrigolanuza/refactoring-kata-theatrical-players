type Play = {
  name: string;
  type: string;
};

type Performance = {
  playID: string;
  audience: number;
};

type PerformanceSummary = {
  customer: string;
  performances: Performance[];
};

type Statement = {
  customer: string;
  totalAmountInUSD: string;
  totalCreditsEarned: number;
  statementLines: StatementLine[];
};

type StatementLine = {
  playName: string;
  audience: number;
  amountInUSD: string;
};
export function statement(summary: PerformanceSummary, plays: Record<string, Play>) {
  const calculationData = statementCalculation(summary, plays);
  return renderStatementAsPlainText(calculationData);
}
function statementCalculation(summary: PerformanceSummary, plays: Record<string, Play>) : Statement {
  return {
    customer: summary.customer,
    totalAmountInUSD: formatAsUSD(calculateTotalAmount(summary, plays)),
    totalCreditsEarned: calculateVolumeCredits(summary, plays),
    statementLines: summary.performances.map(perf => statementLineCalculation(perf, plays))
  };
}
function statementLineCalculation(perf:Performance, plays: Record<string, Play>): StatementLine{
  const play = plays[perf.playID];
  return {
      playName: play.name,
      amountInUSD: formatAsUSD(calculateAmount(play, perf)),
      audience: perf.audience
    };
}
function renderStatementAsPlainText(statement: Statement) {
  let result = `Statement for ${statement.customer}\n`;
  statement.statementLines.forEach(line => {result += ` ${line.playName}: ${line.amountInUSD} (${line.audience} seats)\n`;})
  result += `Amount owed is ${statement.totalAmountInUSD}\n`;
  result += `You earned ${statement.totalCreditsEarned} credits\n`;
  return result;
}
function calculateTotalAmount(summary: PerformanceSummary, plays: Record<string, Play>) {
  return summary.performances
      .map(perf => calculateAmount(plays[perf.playID], perf))
      .reduce( (acc, cur) => acc + cur, 0);
}
function calculateAmount(play: Play, performance: Performance) {
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
function calculateCreditsFor(play: Play, perf: Performance) {
  let baseCredits= Math.max(perf.audience - 30, 0);
  let extraComedyCredits = Math.floor(perf.audience / 5);
  return ("comedy" === play.type) 
         ? baseCredits + extraComedyCredits
         : baseCredits;
}
function calculateVolumeCredits(summary: PerformanceSummary, plays: Record<string, Play>) {
  return summary.performances
      .map( perf =>  calculateCreditsFor(plays[perf.playID], perf))
      .reduce( (acc, cur) => acc + cur, 0);
}
function formatAsUSD(thisAmount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(thisAmount / 100);
}
