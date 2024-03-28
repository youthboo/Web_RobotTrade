import Pict1 from '../../assets/eurusd.png'
import Goldpic from '../../assets/picgold.jpg'
import Eurpic from '../../assets/piceur.jpg'
import Goldpic2 from '../../assets/symg.jpg'
import './DestinationStyles.css'
import DestinationData from './DestinationData'

const Destination = () => {
    return(
        <div className="destination">
            <h1>ยินดีต้อนรับสู่โลกการเทรด</h1>
            <h3>เปิดโอกาสการเทรดตลอด 24 ชั่วโมงด้วย AI Autobot</h3>

            <DestinationData 
                className='first-des'
                heading='ให้โรบอทเทรด AI ทำงานแทนคุณ 24 ชั่วโมง'
                text="Autobot ถูกออกแบบมาเพื่อเป็นเครื่องมือการเทรดอัตโนมัติ 100% ด้วยโรบอทเทรดที่สามารถประมวลผลและตัดสินใจเร็วกว่า ทำให้จุดเข้าและจุดออกของออเดอร์ได้ค่อนข้างแม่นยำ และเพิ่มโอกาสในการทำกำไรมากยิ่งขึ้น"

                img1={Goldpic}
                img2={Goldpic2}
            />

            <DestinationData 
                className='first-des-reverse'
                heading='ปลดล็อคศักยภาพในการเทรดด้วย AI LSTM'
                text="เพิ่มความสำคัญของการเทรดด้วยการใช้เทคโนโลยี Artificial Intelligence (AI) และโมเดล Deep Learning ระดับยอดเยี่ยม Long Short-Term Memory (LSTM) Neural Networks เพื่อช่วยในการวิเคราะห์และตัดสินใจการเทรด โดยบอทที่ใช้ LSTM สามารถทำนายทิศทางของราคาได้อย่างแม่นยำ และปรับใช้ในการเปิด-ปิดออเดอร์ในเวลาที่เหมาะสม ด้วยความเข้าถึงตลาดตลอด 24 ชั่วโมง นักลงทุนทั้งมืออาชีพและมือใหม่สามารถมั่นใจในการตัดสินใจการเทรดของตนเองได้ มาร่วมประสบการณ์การเทรดที่แตกต่างด้วยเทคโนโลยี AI กับเราวันนี้!"
                img1={Eurpic}
                img2={Pict1}
            />
        </div>
    )
}

export default Destination;
