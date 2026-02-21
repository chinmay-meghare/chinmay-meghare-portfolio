import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef} from "react";

const imageArray = [
  "https://images.pexels.com/photos/4079215/pexels-photo-4079215.jpeg",
  "https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg",
  "https://images.pexels.com/photos/5901065/pexels-photo-5901065.jpeg",
  "https://images.pexels.com/photos/5191436/pexels-photo-5191436.jpeg",
  "https://images.pexels.com/photos/31978035/pexels-photo-31978035.jpeg",
  "https://images.pexels.com/photos/17023274/pexels-photo-17023274.jpeg",
  "https://images.pexels.com/photos/32031995/pexels-photo-32031995.jpeg",
  "https://images.pexels.com/photos/5542498/pexels-photo-5542498.jpeg",
];

// Preload outside component too — starts immediately when module loads
const preloadedImages = imageArray.map((src) => {
  const img = new Image();
  img.src = src;
  return img;
});

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const imageDivRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(function () {
    gsap.to(imageDivRef.current, {
      scrollTrigger: {
        trigger: imageDivRef.current,
        start: "top 25%",
        end: "top -100%",
        pin: true,
        pinSpacing: true,
        pinReparent: true,
        // pinType: "transform",
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh:true,
        onUpdate: (elem) => {
          if (!imageRef.current || preloadedImages.length === 0) return;

          const imageIndex =
            elem.progress < 1
              ? Math.floor(elem.progress * imageArray.length)
              : imageArray.length - 1;

          imageRef.current.src = preloadedImages[imageIndex].src;
        },
      },
    });
  }, []);

  return (
    <div>
      <div className="section-1 relative py-1">
        <div
          ref={imageDivRef}
          className="absolute h-[20vw] rounded-3xl w-[15vw] top-44 left-[29vw]"
        >
          <img
            ref={imageRef}
            className="h-full w-full object-cover rounded-3xl"
            src="https://images.pexels.com/photos/4079215/pexels-photo-4079215.jpeg"
            alt=""
          />
        </div>
        <div className="relative font-[font-2]">
          <div className="mt-[60vh]">
            <h1 className="text-[19vw] text-center uppercase leading-[14vw] ">
              seven7y <br />
              two{" "}
            </h1>
          </div>
          <div className="pl-[45%] mt-20">
            <p className="text-6xl">
              {" "}
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; We're
              inquisitive and open-minded, and we make sure creativity crowds
              out ego from every corner. A brand is a living thing, with values,
              a personality and a story. If we ignore that, we can achieve
              short-term success, but not influence that goes the distance. We
              bring that perspective to every brand story we help tell.
            </p>
          </div>
        </div>
      </div>
      <div className="section-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel iusto
        consequuntur magnam maxime aliquid ut sapiente autem eaque animi, culpa
        doloribus assumenda voluptatibus, dolores similique quisquam
        perspiciatis quibusdam corrupti blanditiis sunt nihil perferendis natus
        facilis ipsam. At obcaecati impedit, harum nostrum eveniet ab blanditiis
        autem vero laudantium tenetur! Earum voluptates eum neque nam hic optio
        perferendis dignissimos, quam cum adipisci quibusdam, odit quia nesciunt
        ut aut sunt, dolorum recusandae animi. Iusto omnis exercitationem
        recusandae asperiores excepturi, iste repudiandae cupiditate. Esse illo,
        magnam magni delectus nobis eius repellat, laboriosam inventore omnis
        eum ipsa cum nisi aspernatur animi necessitatibus veniam itaque ipsum
        odit corporis quos, eos maiores. Modi aliquam reprehenderit dolore
        commodi accusamus amet sunt. Mollitia blanditiis ipsam distinctio
        officia voluptatem, harum nihil soluta deserunt natus corporis
        doloremque earum dicta! Nesciunt iure enim cupiditate odio optio velit,
        eveniet, ab, corporis harum suscipit explicabo assumenda pariatur
        inventore? Deleniti tempore saepe officia quod fugit inventore ad sit
        sapiente autem, rerum laborum dignissimos est eum necessitatibus soluta
        accusamus. Eaque error praesentium temporibus nobis reiciendis nemo quos
        unde non in? Quibusdam illo assumenda rerum nobis accusantium fugiat
        aspernatur odio corrupti blanditiis totam, in, labore amet doloremque
        non perferendis nemo, delectus aperiam eveniet provident ipsum aut
        beatae. Veniam architecto hic placeat ea asperiores debitis ratione ut
        officia necessitatibus dolorum reiciendis magnam, eum sed eveniet ex
        totam corrupti vel quia dolores tenetur aut repudiandae animi vitae? Quo
        ipsam placeat commodi ex ea, minima cupiditate laudantium non aliquid
        exercitationem incidunt cum deleniti, odio minus illo aut doloremque
        quas at. Laboriosam impedit corporis sunt quod in error amet
        necessitatibus nam est. Quae modi debitis cumque quod amet perspiciatis
        repellat, vel consectetur. Quas dolores vel iure nulla eius dicta esse
        aut. Dicta aperiam numquam ipsa quis fugiat odit consectetur, tempore,
        ipsam debitis laborum veniam. Natus soluta blanditiis dolore dolorem
        maiores rem explicabo. Excepturi ipsa nesciunt perferendis illo illum
        aperiam vel soluta optio tenetur! Dolores est expedita cum itaque error
        accusantium a nesciunt! Ipsum ducimus, officia labore, quae neque
        blanditiis laudantium odio eum, quibusdam tempore nostrum necessitatibus
        enim! Recusandae natus id deserunt excepturi neque ipsum veritatis quasi
        voluptates, quibusdam accusantium impedit debitis quae cum iusto sequi
        dolores commodi aliquam? Dignissimos, est expedita! Mollitia qui
        voluptatem facere ipsum iusto dolore esse omnis obcaecati consequatur
        ab, velit molestiae veritatis eos quas accusamus quam. Natus similique
        unde perspiciatis illo ipsa quaerat mollitia? Velit beatae distinctio
        voluptates ab, mollitia porro aliquam vel enim necessitatibus, odit nam
        nobis dolores? Vero laborum dolore praesentium commodi atque veritatis
        porro et architecto! Est, accusantium rem officiis suscipit at sunt qui!
        Reiciendis ipsam culpa accusamus totam earum! Molestiae culpa ea non!
        Optio eaque esse saepe amet ad numquam, voluptatibus delectus sunt sed
        illum iste atque eveniet maxime error minima laboriosam iure ea et?
        Obcaecati officiis laborum ad voluptates nostrum dolor magnam vero
        molestias id ducimus, excepturi vel beatae eum tempore? Assumenda veniam
        vitae quam mollitia, recusandae, delectus aspernatur nulla nostrum
        libero saepe ad dignissimos dolorem odio illum, optio corporis inventore
        architecto et. Dignissimos, incidunt aut. Enim autem aspernatur,
        perspiciatis omnis ratione error! Magnam odit ad, illum iusto omnis iste
        modi minus dolorum eveniet facilis soluta in distinctio praesentium
        quibusdam error possimus minima, eius, libero rem quia odio natus
        corrupti? Sit doloribus aliquid nemo doloremque atque minima tempora
        inventore reprehenderit in, accusamus quia, pariatur similique ratione
        fugit reiciendis dolores, repellendus vitae ab? Aperiam nostrum nobis
        doloremque consectetur, tempora obcaecati numquam. Voluptatem et amet
        nisi cupiditate! At hic nostrum debitis excepturi amet quaerat, iure
        expedita omnis placeat, ipsum esse consequuntur molestiae, sit deleniti.
        Quisquam cumque voluptates ratione, optio neque voluptatem soluta aut
        harum quasi amet dolore laboriosam quod ut adipisci inventore
        reprehenderit suscipit quibusdam omnis dolorum est maxime rerum
        cupiditate molestiae! Voluptates qui necessitatibus delectus itaque nam
        tenetur at velit esse cupiditate eaque repellendus quidem dicta possimus
        repudiandae ipsam eos, ratione illo mollitia explicabo earum
        consectetur? Ullam sequi corrupti culpa atque in id blanditiis eos,
        eaque molestiae ut perferendis fugiat totam assumenda ea unde beatae.
        Possimus, vitae perferendis? Maiores fuga, quaerat eaque libero iusto
        iure, impedit ea, id veniam voluptates repellendus praesentium. Est
        reprehenderit a possimus explicabo aliquid esse aliquam molestiae quae
        rerum quidem, omnis iure. Tenetur placeat est iure delectus repellendus
        unde magnam voluptatum quod vero, alias a? Error nulla sequi placeat
        voluptas aperiam minima, amet reiciendis, aliquid modi quo repudiandae
        quidem distinctio, sit dolore earum accusantium excepturi veritatis nemo
        illo aliquam hic. Maiores voluptate voluptas eligendi soluta earum
        voluptatibus impedit! Deleniti molestiae nam fuga natus odit
        reprehenderit ea. Labore unde ab magni, repellat enim laborum eum est
        quas nostrum, tenetur iure impedit fuga illum earum debitis. Repellendus
        quos, natus, consectetur laborum ab beatae quod qui esse sit ut maxime
        aperiam voluptate dolore voluptatibus animi inventore alias ipsa odio
        accusantium quasi hic molestiae. Quam laborum iure aliquid eos magnam,
        dolor cum, totam itaque praesentium architecto quaerat tenetur
        consequuntur ratione a sint accusamus.
      </div>
    </div>
  );
};

export default About;
