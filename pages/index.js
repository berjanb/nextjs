import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const [setupData, setSetupData] = useState()

  async function importClient() {
    const PluginClient = (await import('@dashibase/plugin-client')).default
    const client = new PluginClient()

    client.onSetup((data) => {
      // Prints a log when a SETUP message is received  
      console.log(`Received SETUP message ${JSON.stringify(data)}`)
      setSetupData(data)
    })
    
    // Inform Dashibase that plugin is ready to be setup
    client.init()
  }
  
  useEffect(() => {
    importClient()
  }, [])

  return (
    <div className={styles.container}>
      <h1>Hello USA!</h1>

      <p>After you enter your plugin URL, you will receive the following setup data from Dashibase to use in your plugin:</p>
      <ul>
        <li>columnIds: { setupData ? (setupData.columnIds?.join(', ')) : (<span>Loading</span>) }</li>
        <li>id: { setupData ? (setupData.id) : (<span>Loading</span>) }</li>
        <li>messageType: { setupData ? (setupData.messageType) : (<span>Loading</span>) }</li>
        <li>store: { setupData ? (JSON.stringify(setupData.store)) : (<span>Loading</span>) }</li>
      </ul>
    </div>
  )
}
