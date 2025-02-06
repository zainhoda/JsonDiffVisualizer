export interface ValueChange {
  path: string;
  oldValue: string;
  newValue: string;
}

export interface JsonDiff {
  leftFieldCount: number;
  rightFieldCount: number;
  addedFields: string[];
  removedFields: string[];
  changedValues: ValueChange[];
}

function countFields(obj: any): number {
  if (typeof obj !== 'object' || obj === null) return 0;
  
  let count = Object.keys(obj).length;
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      count += countFields(obj[key]);
    }
  }
  return count;
}

function getFieldPaths(obj: any, prefix = ''): string[] {
  if (typeof obj !== 'object' || obj === null) return [];
  
  const paths: string[] = [];
  for (const key in obj) {
    const currentPath = prefix ? `${prefix}.${key}` : key;
    paths.push(currentPath);
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      paths.push(...getFieldPaths(obj[key], currentPath));
    }
  }
  return paths;
}

function getValue(obj: any, path: string): any {
  return path.split('.').reduce((o, i) => o?.[i], obj);
}

export function compareJson(left: any, right: any): JsonDiff {
  const leftPaths = getFieldPaths(left);
  const rightPaths = getFieldPaths(right);
  
  const addedFields = rightPaths.filter(path => !leftPaths.includes(path));
  const removedFields = leftPaths.filter(path => !rightPaths.includes(path));
  
  const commonPaths = leftPaths.filter(path => rightPaths.includes(path));
  const changedValues: ValueChange[] = [];
  
  for (const path of commonPaths) {
    const leftValue = getValue(left, path);
    const rightValue = getValue(right, path);
    
    if (typeof leftValue !== 'object' && leftValue !== rightValue) {
      changedValues.push({
        path,
        oldValue: String(leftValue),
        newValue: String(rightValue),
      });
    }
  }
  
  return {
    leftFieldCount: countFields(left),
    rightFieldCount: countFields(right),
    addedFields,
    removedFields,
    changedValues,
  };
}
