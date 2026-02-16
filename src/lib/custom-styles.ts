// all this styles are completely configurable! the current styles are only for demostration. 

export const richTextStyles = {
  container: "my-8 rounded-xl bg-[#2D232E] text-[#FFF9F5] md:p-6 p-4 overflow-hidden flex flex-row justify-between shadow-xl border border-[#5E548E]/20 group",
  h1: "text-4xl md:text-5xl font-display mt-16 mb-8 text-[#2D232E]",
  h2: "relative inline-block text-2xl md:text-3xl font-display text-[#2D232E] mt-4 mb-6 tracking-tight after:absolute after:left-0 after:-bottom-2 after:h-1.5 after:w-16 after:rounded-full after:bg-linear-to-r after:from-[#5E548E] after:to-[#A65F5F]",
  h3: "relative inline-block text-xl md:text-2xl font-display text-[#2D232E] mt-4 mb-5 tracking-tight after:absolute after:left-0 after:-bottom-2 after:h-1 after:w-12 after:rounded-full after:bg-linear-to-r after:from-[#5E548E] after:to-[#A65F5F]",
  h4: "text-lg md:text-xl font-bold text-[#2D232E] mt-8 mb-4",
  p: "mb-6 leading-relaxed text-[#2D232E]",
  blockquote: "my-10 p-8 bg-[#5E548E]/5 border-l-4 border-[#5E548E] rounded-r-2xl italic text-lg text-[#2D232E]",
  ul: "list-none md:pl-6 md:mt-4 space-y-3",
  ol: "list-none md:pl-6 md:mt-4 space-y-3 counter-reset-item",
  li: "relative pl-6 before:absolute before:left-0 before:top-[0.6em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#5E548E]",
  inlineCode: "bg-[#5E548E]/10 rounded-md px-1.5 py-0.5 text-[0.9em] font-bold text-[#5E548E] font-mono",
  copyButton: "cursor-pointer bg-[#FFF9F5]/10 hover:bg-[#FFF9F5]/20 text-[#FFF9F5] rounded-md p-2 transition-colors focus-visible:ring-2 focus-visible:ring-[#5E548E] focus:outline-none",
  link: "underline text-[#5E548E] hover:text-[#2D232E] transition-colors decoration-2 underline-offset-4",
  image: "rounded-xl shadow-lg w-full h-auto object-cover",
  caption: "text-center text-sm text-[#2D232E]/90 mt-3 font-medium"
}

export const switcherStyles = {
  button: "flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-gray-300 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 nav-focus min-w-11 min-h-11",
  buttonTextSm: "sm:hidden font-medium text-xs code-style",
  buttonTextLg: "hidden sm:inline font-medium",
  dropdown: "absolute w-min bg-white rounded-2xl shadow-soft-lg border-2 py-2 min-w-45 backdrop-blur-sm overflow-visible z-50 top-full mt-2",
  header: "px-3 py-2 text-xs font-medium border-b",
  footer: "px-3 py-2 text-xs text-black border-t border-violet-400 mt-1",
  optionBase: "w-full px-4 py-3 text-left transition-colors flex items-center gap-3 rounded-lg",
  optionSelected: "bg-violet-100 text-black",
  optionHover: "text-black hover:bg-violet-50",
  optionFocused: "bg-violet-50 ring-2 ring-violet-400 nav-focus",
  optionLangTag: "text-xs text-violet-600 code-style"
}