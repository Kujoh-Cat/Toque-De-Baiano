function abbreviateNumber(number) {
    const SI_SYMBOL = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];

    // determinar o símbolo SI apropriado
    const tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // se for zero, não precisamos de um sufixo
    if (tier === 0)
        return number.toString();

    // obter sufixo e determinar escala
    const suffix = SI_SYMBOL[tier];
    const scale = Math.pow(10, tier * 3);

    // escalar o número
    const scaled = number / scale;

    // formatar o número e adicionar sufixo
    return scaled.toFixed(1) + suffix;
}

function getClassFromLevel(level) {
    const increment = 5; // Incremento de nível
    const initialLevel = 1; // Nível inicial
    const levelsPerTier = 5; // Níveis por "tier"
    
    const tiers = {
        1: "Noob",
        2: "Amador",
        3: "Garçom",
        4: "Espartano",
        5: "Servente",
        6: "Gladiador",
        7: "Lenda",
        8: "Assassino",
        9: "Semi-Deus",
        10: "Deus",
        11: "Prefeito",
        12: "Universal",
        13: "MultiVersal",
        14: "Éden" // Adicionado apenas para completar o exemplo
    };

    // Calcular o "tier" com base no nível
    const tier = Math.ceil((level - initialLevel + 1) / levelsPerTier);

    // Verificar se o nível está dentro dos limites do "tier"
    if (tier in tiers) {
        return tiers[tier];
    } else {
        return "Baiano"; // Caso o nível esteja além do previsto
    }
}