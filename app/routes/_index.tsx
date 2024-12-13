import { json, type MetaFunction } from '@remix-run/cloudflare';
import { ClientOnly } from 'remix-utils/client-only';
import { BaseChat } from '~/components/chat/BaseChat';
import { Chat } from '~/components/chat/Chat.client';
import { Header } from '~/components/header/Header';
import { NightSky } from '~/components/NightSky';

export const meta: MetaFunction = () => {
  return [
    { title: 'Polaris Studio' },
    { name: 'description', content: 'Talk with Polaris Studio, an AI assistant from Shopify' },
  ];
};

export const loader = () => json({});

export default function Index() {
  return (
    <div className="h-full w-full">
      <NightSky>
        <div className="flex flex-col">
          <Header />
          <ClientOnly fallback={<BaseChat />}>{() => <Chat />}</ClientOnly>
        </div>
      </NightSky>
    </div>
  );
}
