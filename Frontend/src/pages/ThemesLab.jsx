import { useThemeStore } from "../Store/useThemeStore.jsx";
import { daisyUIThemes } from "../utils/myThemes.js";
import { Send } from "lucide-react";

const ThemesLab = () => {
	const { theme, setTheme } = useThemeStore();
	return (
		<div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
			<div className="space-y-6">
				<div className="flex flex-col gap-1">
					<h2 className="text-lg font-semibold">Daisy UI's Customization Lab : </h2>
					<p className="text-sm text-base-content/70">Select a Visual Theme to Personalize The Look and Feel of Your Chat Interface.</p>
				</div>

				<div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
					{daisyUIThemes.map((th) => (
						<button
							key={th}
							onClick={() => setTheme(th)}
							className={`group flex flex-col items-center gap-1.5 p-2 rounded-lg cursor-pointer transition-colors
                						${theme === th ? "bg-base-content/20" : "hover:bg-base-200/50"} `}
						>
							<div className="relative h-8 w-full rounded-md overflow-hidden" data-theme={th}>
								<div className="absolute inset-0 grid grid-cols-4 gap-0.5 p-1">
									<div className=" mt-1 rounded-t-md bg-primary">
										<div class="mt-0.5 text-primary-content text-xs font-bold">{th.charAt(0).toUpperCase()}</div>
									</div>
									<div className="mt-1 rounded-t-md bg-secondary ">
										<div class="mt-0.5 text-secondary-content text-xs font-bold">{th.charAt(0).toUpperCase()}</div>
									</div>
									<div className="mt-1 rounded-t-md bg-accent ">
										<div class="mt-0.5 text-accent-content text-xs font-bold">{th.charAt(0).toUpperCase()}</div>
									</div>
									<div className="mt-1 rounded-t-md bg-neutral">
										<div class="mt-0.5 text-neutral-content text-xs font-bold">{th.charAt(0).toUpperCase()}</div>
									</div>
								</div>
							</div>

							<span className="text-[11px] font-medium truncate w-full text-center">
								{th.charAt(0).toUpperCase() + th.slice(1)}
							</span>
						</button>
					))}
				</div>

				<h3 className="text-lg font-semibold mb-3">Preview</h3>
				<div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
					<div className="p-4 bg-base-200">
						<div className="max-w-lg mx-auto">

							<div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">

								<div className="px-4 py-3 border-b border-base-300 bg-base-100">
									<div className="flex items-center gap-3">
										<div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium">
											D
										</div>
										<div>
											<h3 className="font-medium text-sm">Dhanush</h3>
											<p className="text-xs text-base-content/70">Online</p>
										</div>
									</div>
								</div>

								<div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">

									<div className="flex justify-start">
										<div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-base-200">
											<p className="text-sm">Hey There! How Are You...</p>
											<p className="text-[10px] mt-1.5 text-base-content/70">8:00 AM</p>
										</div>
									</div>

									<div className="flex justify-end">
										<div className="max-w-[80%] rounded-xl p-3 shadow-sm bg-primary text-primary-content">
											<p className="text-sm">Hi There, I'M Fine, How Its Going With You... </p>
											<p className="text-[10px] mt-1.5 text-primary-content/70">8:05 AM</p>
										</div>
									</div>
								</div>


								<div className="p-4 border-t border-base-300 bg-base-100">
									<div className="flex gap-2">
										<input
											type="text"
											className="input input-bordered flex-1 text-sm h-10"
											placeholder="Type a message..."
											value="Meassage Here..."
											readOnly
										/>
										<button className="btn btn-primary h-10 min-h-0">
											<Send size={18} />
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ThemesLab;

