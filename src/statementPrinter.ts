import {PerformanceSummary, Play} from "./performanceCalculator";
import {Statement, statementCalculation} from "./statement";

export function statementPrinter(summary: PerformanceSummary, plays: Record<string, Play>) {
  const calculationData = statementCalculation(summary, plays);
  return printStatementAsPlainText(calculationData);
}
function printStatementAsPlainText(statement: Statement) {
  let result = `Statement for ${statement.customer}\n`;
  statement.statementLines.forEach(line => {result += ` ${line.playName}: ${line.amountInUSD} (${line.audience} seats)\n`;})
  result += `Amount owed is ${statement.totalAmountInUSD}\n`;
  result += `You earned ${statement.totalCreditsEarned} credits\n`;
  return result;
}
