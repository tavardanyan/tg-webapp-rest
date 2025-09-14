// Simple wrapper around Telegram WebApp API
export function useTelegram() {
  const tg = (window as any).Telegram?.WebApp;

  const sendData = (data: any) => {
    tg?.sendData(JSON.stringify(data));
  };

  return {
    tg,
    sendData,
    user: tg?.initDataUnsafe?.user,
  };
}
