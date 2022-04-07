import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticPaths, GetStaticProps } from "next";
import { api } from "../../services/api";
import { convertDurationToTimeString } from "../../utils/convertDurationToTImeString";
import styles from './episode.module.scss';
import Image from 'next/image';
import Link from 'next/link';

type EpisodeProps = {
  episode: Episode;
};

type Episode = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  duration: string;
  durationAsString: string; //isso aqui eu acho que vou ter que fazer a conversão na hora
  url: string;
  published_at: string;
  description: string;
};

export default function Episode({ episode }: EpisodeProps) {

  return (

    <div className={styles.episode}>
      <div className={styles.thumbnailContainer}>
        <Link href="/">
        <button>
          <img src="/arrow-left.svg" alt="Voltar"/>
        </button>
        </Link>
        <Image 
        width={700}
        height = {160}
        src = {episode.thumbnail}
        objectFit="cover"
        />
        <button type="button">
          <img src="/play.svg" alt="Tocar episódio" />
        </button>
      </div>

      <header>
        <h1>{episode.title}</h1>
        <span>{episode.members}</span>
        <span>{episode.published_at}</span>
        <span>{episode.durationAsString}</span>
      </header>

      <div className={styles.description} dangerouslySetInnerHTML= {{__html:episode.description}} />
    

      <div></div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], //quando passo esse paths vazio nenhuma pagina dos episoes sera gerada quando eu bildo a page,
              //se eu quisesse chegar uma page por exemplo: paths:[ params: { skug: 'a importancia-da-contribuiocao-em-open-source' } ] 
    fallback: 'blocking', // o que determina essa propriedade da geração de page é o fallback, se caso eu passasse 'false' para o fallback ele soh geraria as pages que fossem passadas para os paths, retornaria 404 caso tivesse false e eu não passasse nada pros paths
  };          //o blocking faz com que o usuario só seja direcionado pra page quando o conteudo estiver previamente carregad
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { slug }  = ctx.params!;

  const { data } = await api.get(`/episodes/${slug}`); //nao entendi como eu passei pro data as informaçoes do episodio clickado

  const episode = {
    id: data.id,
    title: data.title,
    thumbnail: data.thumbnail,
    members: data.members,
    publishadAat: format(parseISO(data.published_at), "d MMM yy", {
      locale: ptBR,
    }),
    duration: Number(data.file.duration),
    durationAsString: convertDurationToTimeString(Number(data.file.duration)),
    url: data.file.url,
    description: data.description
  };

  return {
    props: {
      episode,
    },
    revalidate: 60 * 60 * 24, //24 horas
  };
};
