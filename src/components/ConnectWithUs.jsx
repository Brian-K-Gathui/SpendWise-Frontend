import { Mail, Phone, MapPin } from "lucide-react";

const ConnectWithUs = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start p-8">
      <div className="md:w-1/2">
        <h2 className="text-2xl font-bold mb-2">Connect With Us</h2>
        <p className="text-gray-600">We're here to assist you with any questions or support you may need.</p>
      </div>
      <div className="md:w-1/2 space-y-4">
        <div className="flex items-center space-x-2">
          <Mail className="w-5 h-5" />
          <div>
            <h4 className="font-semibold">Email</h4>
            <a href="mailto:hello@spendwise.com" className="text-blue-500 hover:underline">hello@spendwise.com</a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-5 h-5" />
          <div>
            <h4 className="font-semibold">Phone</h4>
            <a href="tel:+254701181197" className="text-blue-500 hover:underline">+254701181197</a>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5" />
          <div>
            <h4 className="font-semibold">Office</h4>
            <p className="text-gray-600">Westgate mall, Westlands, Nairobi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectWithUs;
