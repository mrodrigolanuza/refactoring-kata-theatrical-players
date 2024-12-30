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
function printStatementAsHtml(statement: Statement) {
  let result = `<h1>Statement for ${statement.customer}</h1>`;
  result += '<ul>';
  statement.statementLines.forEach(line => {result += `<li>${line.playName}: ${line.amountInUSD} (${line.audience} seats)</li>`;})
  result += '</ul>';
  result += `<p>Amount owed is ${statement.totalAmountInUSD}</p>`;
  result += `<p>You earned ${statement.totalCreditsEarned} credits</p>`;
  return result;
}

