import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Corporate from "../Pages/ServicesPages/Corporate/Corporate";
import Event from "../Pages/ServicesPages/Event/Event";
import Fashion from "../Pages/ServicesPages/Fashion/Fashion";
import Food from "../Pages/ServicesPages/Food/Food";
import MaternityAndBabyShoot from "../Pages/ServicesPages/MaternityAndBabyShoot/MaternityAndBabyShoot";
import Sports from "../Pages/ServicesPages/Sports/Sports";
import Wedding from "../Pages/ServicesPages/Wedding/Wedding";
import { getServiceById } from "../utils/APIs/servicesApis";
import ProductPhotography from "../Pages/ServicesPages/ProductPhotography/ProductPhotography";
import Automobile from "../Pages/ServicesPages/Automobile/Automobile";

/* Existing service pages */


const ServiceRouter = () => {
  const { serviceId } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [manualService, setManualService] = useState(null);
  useEffect(() => {
    // 🔁 RESET STATE ON EVERY ROUTE CHANGE
    setServiceData(null);
    setManualService(null);
    setError("");
    setLoading(true);
      /* ===============================
       🔓 MANUAL SERVICE (DEV)
    =============================== */
     // 🔓 Manual service (dev)
  if (serviceId === "event-service") {
    setManualService("event");
    setLoading(false);
    return;
  }

  if (serviceId === "fashion-service") {
    setManualService("fashion");
    setLoading(false);
    return;
  }

  if (serviceId === "automotive-service") {
    setManualService("automotive");
    setLoading(false);
    return;
  }

  if (serviceId === "wedding-service") {
    setManualService("wedding");
    setLoading(false);
    return;
  }

  if (serviceId === "food-service") {
    setManualService("food");
    setLoading(false);
    return;
  }

  if (serviceId === "maternity-service") {
    setManualService("maternity");
    setLoading(false);
    return;
  }

    /* ===============================
       🔁 API SERVICE
    =============================== */
    const fetchService = async () => {
      try {
        const res = await getServiceById(serviceId);
        console.log("getServiceById API response:", res);

        if (res?.data?.success) {
          setServiceData(res.data.data);
        } else {
          setError("Service not found");
        }
      } catch (err) {
        setError("Failed to load service");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  if (loading) return <p>Loading service...</p>;
  if (error) return <p>{error}</p>;

  if (manualService === "event") {
    return <Event />;
  }
  if (manualService === "fashion") {
    return <Fashion />;
  }
  if (manualService === "automobile") {
    return <Automobile />;
  }
  if (manualService === "wedding") {
    return <Wedding />;
  }
  if (manualService === "food") {
    return <Food />;
  }
  if (manualService === "maternity") {
    return <MaternityAndBabyShoot />;
  }
  if (!serviceData) return null;

  switch (serviceData.serviceName) {
    case "Automobile Photography":
      return <Automobile serviceData={serviceData} />;

    case "Corporate Photography":
      return <Corporate serviceData={serviceData} />;

    case "Event Photography":
      return <Event serviceData={serviceData} />;

    case "Fashion Photography":
      return <Fashion serviceData={serviceData} />;

    case "Food Photography":
      return <Food serviceData={serviceData} />;

    case "Maternity & Baby Shoot":
      return <MaternityAndBabyShoot serviceData={serviceData} />;

    case "Maternity and Baby Shoot":
      return <MaternityAndBabyShoot serviceData={serviceData} />;

    case "Product Photography":
      return <ProductPhotography serviceData={serviceData} />;

    case "Sports Photography":
      return <Sports serviceData={serviceData} />;

    case "Wedding Photography":
      return <Wedding serviceData={serviceData} />;

    default:
      return <p>Service page not available</p>;
  }
};

export default ServiceRouter;
