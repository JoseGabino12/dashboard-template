/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Captura todas las rutas que comiencen con /api/
        destination: 'http://grupotgcolima.dyndns.org:9365/:path*', // Reemplaza con la URL base de la API externa
      },
    ];
  },
};

export default nextConfig;
