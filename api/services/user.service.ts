export const createPassword = (length: number = 14): string => {
    let password: string = '';
    const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$&ç';
    const charactersLength: number = characters.length;
    for ( let i = 0; i < length + 1; i++ ) {
      password += characters.charAt(Math.floor(Math.random() * charactersLength));
   }

   return password;
}