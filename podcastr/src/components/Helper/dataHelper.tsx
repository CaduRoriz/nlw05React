const today = new Date();

export const dia = () => {
    return(
        today.getDate()
    );
}

export const diaSemana = () => {
    return(
        semana[today.getDay()]
    );
}

export const mes = () => {
    return(
        meses[today.getMonth()]
    );
}

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

const semana = [
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
    "Dom"
];