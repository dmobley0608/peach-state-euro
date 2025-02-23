import React from 'react';

const PriceSheet = ({ services }) => {
    console.log(services)
    const sortedServices = services.sort((a, b) => b.title - a.title);
    return (
        <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-[#D7CCC8] to-[#BCAAA4] p-8 rounded-lg shadow-xl border-2 border-[#8D6E63]">
                <h2 className="text-3xl font-bold text-[#3E2723] text-center mb-8">Service Price List</h2>
                <div className="space-y-4">
                    {sortedServices.map((service) => (
                        <div
                            key={service._id}
                            className="flex justify-between items-center py-3 px-4 border-b-2 border-[#8D6E63] hover:bg-[#EFEBE9] transition-colors rounded"
                        >
                            <span className="text-[#3E2723] text-lg font-medium">{service.title}</span>
                            <span className="text-[#4E342E] font-bold text-xl">
                                ${service.price.toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PriceSheet;
