export const accountNumberAssigner = (): number => {
    const numbers: number[] = [];

    while (numbers.length < 10) {
        const digit = Math.floor(Math.random() * 100) + 1;
        numbers.push(digit);
    }
    
    return parseInt(numbers.join(''));
}