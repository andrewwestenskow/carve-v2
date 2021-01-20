import React, { useState, useRef, useEffect } from 'react'
import { MdPhonelink } from 'react-icons/md'
import { AvailableDevice } from 'types/player'
import CSS from 'csstype'
import { getUserDevices } from 'spotify/fetch'
import useSpotifyRequest from 'hooks/useSpotifyRequest'
import Dismisser from 'components/util/Dismisser'

interface ADProps {
  devices: AvailableDevice[]
  isLoading: Boolean
}

const iconStyle: CSS.Properties = {
  color: '#fff',
  fontSize: '24px',
  cursor: 'pointer',
}

const DeviceList: React.FC<ADProps> = (props) => {
  return (
    <div className="device-list">
      <p className="primary-label list-heading">Available Devices</p>
      {props.isLoading ? (
        <p>Loading</p>
      ) : (
        props.devices.map((device) => (
          <div
            className={`${device.is_active ? 'active-device' : null} device`}
          >
            <p className="device-name">{device.name}</p>
            <p className="device-type">{device.type}</p>
          </div>
        ))
      )}
    </div>
  )
}

const AvailableDevices: React.FC = (props) => {
  const [showList, setShowList] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [devices, setDevices] = useState<AvailableDevice[]>([])
  const request = useSpotifyRequest()

  function handleToggle() {
    if (showList) {
      setShowList(false)
    } else {
      setIsLoading(true)
      getUserDevices(request).then((devices) => {
        setShowList(true)
        setDevices(devices)
        setIsLoading(false)
      })
    }
  }

  return (
    <div className="AvailableDevices">
      <MdPhonelink onClick={handleToggle} style={iconStyle} />
      {showList && (
        // <Dismisser onDismiss={() => setShowList(false)}>
        <DeviceList devices={devices} isLoading={isLoading} />
        // </Dismisser>
      )}
    </div>
  )
}

export default AvailableDevices
