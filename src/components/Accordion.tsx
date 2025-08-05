import { ReactNode, useState } from 'react';
import PlusIcon from './icon/PlusIcon';

export interface AccordionItem {
    id: string;
    title: string;
    content: ReactNode;
}

export interface AccordionProps {
    items: AccordionItem[];
    activeItemId?: string;
    onItemClick?: (id: string) => void;
}

export function Accordion({ items, activeItemId, onItemClick }: AccordionProps) {
    const [activeItem, setActiveItem] = useState<string | null>(activeItemId || null);

    function handleItemClick(id: string) {
        if (onItemClick) {
            onItemClick(id);
        }
        setActiveItem(activeItem === id ? null : id);
    }

    return (
        <div>
            {items.map((item) => {
                const isActive = activeItem === item.id;
                return (
                    <div key={item.id} className='py-[20px] px-0 space-y-2 border-b border-b-[#30363D]'>
                        <button
                            onClick={() => handleItemClick(item.id)}
                            className="w-full flex items-center justify-between text-left"
                        >
                            <div className='text-title lg:text-h5 font-black text-white'>
                                {item.title}
                            </div>
                            <PlusIcon className={`h-4 w-4 text-[#19ECDE] transition-all duration-300 ease-in-out ${isActive ? 'opacity-0' : 'opacity-100'}`} />
                        </button>

                        <div className={`transition-all duration-300 ease-in-out ${isActive
                            ? 'max-h-96 opacity-100'
                            : 'max-h-0 opacity-0'
                            } overflow-hidden`}>
                            <div className="text-body font-black text-[#A2C1E4]">
                                {item.content}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    );
}