import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router'
import { api } from '../../services/api';
import { convertDurationToTimeString } from '../../utils/convertDurationToTImeString';

type EpisodeProps = {
    episode: Episode
}

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
      
}

export const getStaticPaths: GetStaticPaths = async () => {
    return{
        paths: [],
        fallback: 'blocking',
    }
}


export default function Episode({episode}: EpisodeProps){
    const router = useRouter();

    return(
        <div>
        <h1>{episode.title}</h1>
        </div>
    )
}


export const getStaticProps: GetStaticProps = async (ctx) => {
    const  slug  = ctx.params;
    const { data } = await api.get(`/episodes/${slug}`);

    const episode = {
          
          id: data.id,
          title: data.title,
          thumbnail: data.thumbnail,
          members: data.members,
          publishadAat: format(parseISO(data.published_at), 'd MMM yy', {locale: ptBR}),
          duration: Number(data.file.duration),
          durationAsString: convertDurationToTimeString(Number(data.file.duration)),
          url: data.file.url,
          
        
      };

    return {
        props: {
            episode,
        },
        revalidate: 60 * 60 * 24, //24 horas
    }
}