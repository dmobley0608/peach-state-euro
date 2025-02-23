import ImageKit from 'imagekit-javascript';

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
    urlEndpoint:   "https://ik.imagekit.io/7a4ad0swj"
});

export const getAuthenticationParameters = async () => {
    try {
        const response = await fetch('/api/imagekit/auth');
        if (!response.ok) {
            throw new Error('Failed to get authentication parameters');
        }
        const data = await response.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error('Auth Error:', error);
        throw error;
    }
};

export { imagekit };
