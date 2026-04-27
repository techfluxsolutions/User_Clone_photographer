import React, { useEffect, useRef } from "react";

const LocationPickerMap = ({ onSelect, isOpen }) => {
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapInitialized = useRef(false);

  useEffect(() => {
    const loadScript = () => {
      if (window.google) return delayedInit();

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = delayedInit;
      document.body.appendChild(script);
    };

    const delayedInit = () => {
      setTimeout(() => initMap(), 300);
    };

    const initMap = () => {
      if (mapInitialized.current) return;
      mapInitialized.current = true;

      const geocoder = new window.google.maps.Geocoder();

      const createMap = (center) => {
        const map = new window.google.maps.Map(mapRef.current, {
          center,
          zoom: 15,
        });

        const marker = new window.google.maps.Marker({
          position: center,
          map,
          draggable: true,
        });

        // 🔥 Address extractor
        const fetchAddress = (latLng) => {
          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK" && results[0]) {
              const place = results[0];
              const components = place.address_components;

              const getComponent = (type) => {
                const comp = components.find((c) =>
                  c.types.includes(type)
                );
                return comp ? comp.long_name : "";
              };

              const data = {
                location: place.formatted_address || "",
                streetName:
                  getComponent("route") ||
                  getComponent("sublocality") ||
                  "",
                city:
                  getComponent("locality") ||
                  getComponent("administrative_area_level_2") ||
                  getComponent("sublocality") ||
                  "",
                state: getComponent("administrative_area_level_1"),
                postalCode: getComponent("postal_code") || "",
                lat: latLng.lat(),
                lng: latLng.lng(),
              };

              onSelect(data);
            }
          });
        };

        // ✅ Map click
        map.addListener("click", (event) => {
          marker.setPosition(event.latLng);
          map.panTo(event.latLng);
          fetchAddress(event.latLng);
        });

        // ✅ Marker drag
        marker.addListener("dragend", (event) => {
          fetchAddress(event.latLng);
        });

        // 🔍 Autocomplete with fallback
        const autocomplete = new window.google.maps.places.Autocomplete(
          inputRef.current,
          {
            fields: ["geometry", "formatted_address", "address_components"],
          }
        );

        autocomplete.bindTo("bounds", map);
        autocomplete.setComponentRestrictions({ country: "in" });

        const moveToLocation = (loc) => {
          map.panTo(loc);
          map.setZoom(15);
          marker.setPosition(loc);
          fetchAddress(loc);
        };

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();

          if (!place.geometry || !place.geometry.location) {
            // 🔥 fallback for typed input like "Delhi"
            const query = inputRef.current.value;

            geocoder.geocode({ address: query }, (results, status) => {
              if (status === "OK" && results[0]) {
                moveToLocation(results[0].geometry.location);
              }
            });
            return;
          }

          moveToLocation(place.geometry.location);
        });

        // 🔥 Handle Enter key manually
       setTimeout(() => {
  if (!inputRef.current) return;

  inputRef.current.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const query = inputRef.current.value;

      if (!query) return;

      geocoder.geocode({ address: query }, (results, status) => {
        if (status === "OK" && results[0]) {
          moveToLocation(results[0].geometry.location);
        } else {
          console.log("Geocode failed:", status);
        }
      });
    }
  });
}, 500);

        // initial autofill
        fetchAddress(new window.google.maps.LatLng(center));

        // fix resize
        setTimeout(() => {
          window.google.maps.event.trigger(map, "resize");
        }, 200);
      };

      // ✅ Current location first
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            createMap({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            createMap({ lat: 20.5937, lng: 78.9629 });
          }
        );
      } else {
        createMap({ lat: 20.5937, lng: 78.9629 });
      }
    };

    loadScript();
  }, [onSelect]);

  // reset when modal closes
  useEffect(() => {
    if (!isOpen) {
      mapInitialized.current = false;
    }
  }, [isOpen]);

  return (
    <div style={{ position: "relative" }}>
      {/* 🔍 Search */}
      <input
        ref={inputRef}
        type="text"
        placeholder="Search location (e.g. Delhi, Mumbai)..."
        style={{
          width: "100%",
          padding: "10px 12px",
          marginBottom: "10px",
          borderRadius: "8px",
          border: "1px solid #ddd",
          fontSize: "14px",
        }}
      />

      {/* 🗺️ Map */}
      <div
        ref={mapRef}
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "10px",
        }}
      />

      <p style={{ fontSize: "12px", marginTop: "6px", color: "#666" }}>
        Search, press Enter, drag or click to select location.
      </p>
    </div>
  );
};

export default LocationPickerMap;