export function convertDurationToTimeString(duration: number) {
  //dado passado em segundos
  const hours = Math.floor(duration / 3600); //Math.floor arredonda pro menor numero pra ver quantas horas tem o podcast, ex: caso de 0.83 quer dizer que não deu uma hora completa então ele vai ter que responder só a partir de minutos
  const minutes = Math.floor((duration % 3600) / 60); // estou pegando o resto da divisão(por isso uso o % pra dividir) e divido por 60 para me retornar os minutos
  const seconds = duration % 60;

  const finalResult = [hours, minutes, seconds]
    .map((unit) => String(unit).padStart(2, "0")) //primeiro transformo o atributo em String e depois com esse padStart eu digo a ele que o atributo tem que ter 2 caracteres, caso ele so possua um ele via adicionar '0' a esquerda. ex: caso tenha apenas 1 hora ele vai setar como 01
    .join(":"); //com o join eu uno os resultados e adiciono os dois pontos na uniao dos 3, ex 01:56:05

  return finalResult;
}
