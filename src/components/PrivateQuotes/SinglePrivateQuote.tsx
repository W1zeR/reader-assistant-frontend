import { Quote } from "@/types/reader-assistant";
import {
  BookOpenIcon,
  ClockIcon,
  CogIcon,
  GlobeAltIcon,
  HashtagIcon,
  PencilIcon,
  PencilSquareIcon,
  UserIcon,
  XMarkIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import LikeButton from "@/components/LikeButton";
import axios from "axios";
import { useSession } from "next-auth/react";

const SinglePrivateQuote = ({ quote }: { quote: Quote }) => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const { data: session } = useSession();

  const handlePublish = async () => {
    await axios.put(API_URL + `/quotes/${quote.id}/markPrivateAsPending`, {},
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      });
  };

  const handleDelete = async () => {
    await axios.delete(API_URL + `/quotes/${quote.id}`,
      {
        headers: {
          Authorization: `Bearer ${session?.accessToken}`
        }
      });
  };

  return (
    <div className="w-full mt-10">
      <div
        className="rounded-sm bg-white p-8 shadow-two duration-300 hover:shadow-one dark:bg-dark dark:shadow-three
        dark:hover:shadow-gray-dark lg:px-5 xl:px-8">
        <p
          className="mb-4 pb-4 border-b border-body-color border-opacity-10 leading-relaxed text-dark dark:border-white
          dark:border-opacity-10 text-lg dark:text-white lg:text-base xl:text-lg">
          {quote.content}
        </p>
        <div className="flex items-center">
          <div className="w-full">
            <h3 className="text-dark dark:text-white text-base">
              <BookOpenIcon className="h-6 w-6 inline-block" /> {quote.book.title}
            </h3>
            <div className="mt-5">
              <span><PencilIcon className="h-6 w-6 inline-block" /> </span>
              {quote.book.authors.map((a, index) => (
                <span key={a.id} className="text-dark dark:text-white text-base">
                  {(index ? ", " : "") + a.name} {a.surname}{(a.patronymic ? ` ${a.patronymic}` : "")}</span>
              ))}
            </div>
            <div className="mt-5">
              <span><HashtagIcon className="h-6 w-6 inline-block" /> </span>
              {quote.tags.map((t, index) => (
                <span key={t.id} className="text-dark dark:text-white text-base">
                  {(index ? ", " : "") + t.name}</span>
              ))}
            </div>
            <div className="mt-5">
              <UserIcon className="h-6 w-6 inline-block" /> {quote.profile.login}
            </div>
            <div className="mt-5">
              <ClockIcon className="h-6 w-6 inline-block" /> {quote.changeDate}
            </div>
            {quote.status.name == "PUBLIC" ?
              <div className="mt-5">
                <LikeButton likes={quote.likes} quoteId={quote.id} />
              </div>
              : quote.status.name == "PRIVATE" ?
                <div className="mt-5">
                  <button onClick={handlePublish}
                          className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 text-white
                    py-2 px-4 rounded-full text-base">
                    <GlobeAltIcon className="h-6 w-6 inline-block" /> Опубликовать
                  </button>
                </div> :
                <div className="mt-5">
                  <CogIcon className="h-6 w-6 inline-block" /> В ожидании опубликования
                </div>
            }
            {
              quote.status.name == "PRIVATE" ?
                <div className="mt-5">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-900 text-white
                    py-2 px-4 rounded-full text-base">
                    <Link
                      href={`/private/${quote.id}/edit`}>
                      <PencilSquareIcon className="h-6 w-6 inline-block" /> Редактировать
                    </Link>
                  </button>
                </div>
                : null
            }
            {
              quote.status.name == "PRIVATE" ?
                <div className="mt-5">
                  <button onClick={handleDelete}
                          className="bg-red-500 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-900 text-white
                    py-2 px-4 rounded-full text-base">
                    <XMarkIcon className="h-6 w-6 inline-block" /> Удалить
                  </button>
                </div>
                : null
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePrivateQuote;
