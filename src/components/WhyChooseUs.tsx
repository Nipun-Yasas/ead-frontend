import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EngineeringIcon from '@mui/icons-material/Engineering';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BuildIcon from '@mui/icons-material/Build';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';

const features = [
    {
        key: 'realtime',
        title: 'Real-Time Tracking',
        desc: 'Monitor your vehicle service progress live from anywhere, anytime',
        Icon: AccessTimeIcon,
    },
    {
        key: 'experts',
        title: 'Expert Technicians',
        desc: 'Certified professionals with years of experience in automotive service',
        Icon: EngineeringIcon,
    },
    {
        key: 'booking',
        title: 'Easy Booking',
        desc: 'Schedule appointments online at your convenience with instant confirmation',
        Icon: EventAvailableIcon,
    },
    {
        key: 'quality',
        title: 'Quality Guarantee',
        desc: 'All services backed by our comprehensive warranty and satisfaction guarantee',
        Icon: VerifiedUserIcon,
    },
    {
        key: 'range',
        title: 'Full Service Range',
        desc: 'From routine maintenance to custom modifications and major repairs',
        Icon: BuildIcon,
    },
    {
        key: 'support',
        title: 'Customer Support',
        desc: '24/7 support team ready to assist with any questions or concerns',
        Icon: HeadsetMicIcon,
    },
];

export default function WhyChooseUs() {
    return (
        <section className="bg-[#171717] text-[var(--color-text-primary)] py-18" style={{ fontFamily: 'Arial, sans-serif' }} aria-labelledby="why-choose-heading">
            <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 id="why-choose-heading" className="text-3xl md:text-4xl lg:text-5xl font-semibold mb-7">Why Choose AutoCare Pro</h2>
                <p className="max-w-3xl mx-auto mb-10 text-base md:text-xl" style={{ color: '#717182' }}>Experience excellence in automotive service with real-time tracking and professional care</p>

                <div className="grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((f) => (
                        <article key={f.key} className="group relative bg-[#171717] rounded-2xl p-6 pt-8 flex flex-col items-center text-center overflow-hidden hover:-translate-y-1 transition-transform duration-200 min-h-[220px] sm:min-h-[240px] lg:min-h-[280px] shadow-[0_6px_12px_rgba(255,255,255,0.06)]" style={{ borderColor: 'transparent' }}>
                            {/* icon (now inside the card) */}
                            <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md mb-4 transition-colors duration-200 bg-[#D60507] group-hover:bg-[rgba(214,5,7,0.1)]">
                                <f.Icon className="text-white group-hover:text-[#D60507] transition-colors duration-200" style={{ fontSize: 28 }} aria-hidden />
                            </div>

                            <div className="flex-1 w-full px-4 flex flex-col justify-center">
                                <h3 className="text-xl md:text-2xl lg:text-2xl font-medium text-[var(--color-text-primary)] mb-4">{f.title}</h3>
                                <p className="text-base md:text-lg leading-8 text-[#B6B6B6] group-hover:text-[#717182] transition-colors duration-200">{f.desc}</p>
                            </div>

                            {/* bottom bevel / drop shadow accent to mimic the image */}
                            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-6 bg-gradient-to-t from-black to-transparent rounded-b-2xl opacity-70" />
                            <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[92%] h-1 bg-[var(--color-border-subtle)] rounded-b-2xl" />
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
