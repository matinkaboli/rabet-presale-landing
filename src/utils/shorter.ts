const shorter = (text: string): string => `${text.slice(0, 6)}...${text.slice(-6)}`;

export default shorter;
