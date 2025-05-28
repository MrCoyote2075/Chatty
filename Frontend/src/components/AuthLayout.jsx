// components/AuthLayout.jsx
import { MessageSquare } from "lucide-react";
import { AnimationPattern } from "./AnimationPattern";

export const AuthLayout = ({ title, subtitle, children, animationTitle}) => {
    return (
        <div className="h-screen grid lg:grid-cols-2">
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="w-6 h-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">{title}</h1>
                            <p className="text-base-content/60">{subtitle}</p>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
            <AnimationPattern
                title={animationTitle}
                description={`Hey, I’m Chatty👋 Come On,\nLet’s Start Connecting with Your Friends!`}
            />
        </div>
    );
}
