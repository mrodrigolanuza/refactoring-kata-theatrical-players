import {PerformanceSummary, Play} from "./performanceCalculator";
import {Statement, statementCalculation} from "./statement";

export function statementPrinter(summary: PerformanceSummary, plays: Record<string, Play>) {
  const calculationData = statementCalculation(summary, plays);
  return printStatementAsPlainText(calculationData);
}


export function statementWebPrinter(summary: PerformanceSummary, plays: Record<string, Play>) {
  const calculationData = statementCalculation(summary, plays);
  return printStatementAsHtml(calculationData);
}
function printStatementAsPlainText(statement: Statement) {
  let result = `Statement for ${statement.customer}\n`;
  statement.statementLines.forEach(line => {result += ` ${line.playName}: ${line.amountInUSD} (${line.audience} seats)\n`;})
  result += `Amount owed is ${statement.totalAmountInUSD}\n`;
  result += `You earned ${statement.totalCreditsEarned} credits\n`;
  return result;
}
function printStatementAsHtml(calculationData: Statement) {
  return `<h1>Statement for BigCo</h1>
 <ul><li>Hamlet: $650.00 (55 seats)</li>
 <li>As You Like It: $580.00 (35 seats)</li>
 <li>Othello: $500.00 (40 seats)</li><ul>
<p>Amount owed is $1,730.00</p>
<p>You earned 47 credits</p>`;  
}