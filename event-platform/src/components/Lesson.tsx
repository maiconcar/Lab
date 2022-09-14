import {CheckCircle, Lock} from 'phosphor-react';
import { isPast,format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames'

interface LessonProps {
    title: string;
    slug: string;
    availableAt: Date;
    type:'live' | 'class';
}

export function Lesson( props: LessonProps ) {
    const {slug} = useParams <{slug :  string}>()

    const isLessonAvailable = isPast(props.availableAt);
    const availablDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'K'h'mm",{
        locale: ptBR,
    })

const isActivelesson = slug === props.slug;

    return (
        <Link to={`/event/lesson/${props.slug} `} className="group">
            <span className="text-gray-300">
                {availablDateFormatted}
            </span>

           
            <div 
            className={classNames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500',{
              'bg-green-500' : isActivelesson,
            })}>
                    <header className="flex items-center justify-between">
                       {isLessonAvailable ? (
                             <span className={classNames('text-sm text-blue-500 font-medium flex items-center gap-2',{
                                'text-white' : isActivelesson,
                                'text-blue-500' : !isActivelesson,
                             })}> 
                                <CheckCircle size={20}/>
                                    Conteúdo liberado 
                             </span>
                       ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2"> 
                            <Lock size={20}/>
                                Em breve 
                        </span>
                       ) }
                        <span className={classNames('text-xs rounded py-[0.125rem] px-2 text-white border  font-bold',{
                            'border-white' : isActivelesson,
                            'border-green-300' :!isActivelesson,

                        })}> 
                            {props.type === 'live' ? 'AO VIVO' : 'AULA PRATICA' }
                        </span>
                    </header>
                    <strong className={classNames('mt-5 block',{
                        'text-white' : isActivelesson,
                        'text-gray-200' : !isActivelesson,
                    })}> 
                        {props.title} 
                    </strong>
            </div>
        </Link>
    )
}