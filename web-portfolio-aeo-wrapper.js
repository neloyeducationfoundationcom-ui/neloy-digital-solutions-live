import app from "./seo-meta-cleanup-wrapper.js";

const PROJECTS = [
  {
    name: "Nervicia Construction",
    title: "Construction & Remodeling Website",
    url: "https://nerviciaconstruction.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fnerviciaconstruction.com%2F?w=1200",
    alt: "Nervicia Construction remodeling and construction website project",
    description: "A service-focused construction and remodeling website with clear kitchen, bathroom and home-construction content, project visibility, FAQ information and strong paths for customer enquiries.",
    keywords: "Construction Website Design • Remodeling Website • Service Business Website"
  },
  {
    name: "Monarch Sustainable Landscaping",
    title: "Sustainable Landscaping Website",
    url: "https://monarchsustainablelandscaping.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmonarchsustainablelandscaping.com%2F?w=1200",
    alt: "Monarch Sustainable Landscaping eco friendly landscaping website project",
    description: "A landscaping website structured around sustainable outdoor services, native planting, water-wise irrigation, service education, client trust and quote-focused calls to action.",
    keywords: "Landscaping Website Design • Eco-Friendly Business Website • Lead Generation"
  },
  {
    name: "Meta Shades",
    title: "Sports Sunglasses E-commerce Website",
    url: "https://www.metashadesog.com/",
    screenshot: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fwww.metashadesog.com%2F?w=1200",
    alt: "Meta Shades sports sunglasses ecommerce website project",
    description: "An e-commerce website for an active-lifestyle sunglasses brand, combining product collections, shopping links, customer galleries, brand storytelling and mobile-friendly product discovery.",
    keywords: "E-commerce Website Design • Product Website • Sports Brand Website"
  }
];

const BZD_CLIENT_IMAGE = "data:image/webp;base64,UklGRpSRAQBXRUJQVlA4IIiRAQCwPgedASpqAwcHPrFSo02nJLK1JRLK2qAWCWVu3Lk6tiQ/qdL3859hdqfpn/E4HH9Pgt5N/3PQk9AbP+UPhd5G9D9Y4bfmeLz6X/l+l//0OzP/zvYH/Yr/t+wrmyuI+gb/y+ZYafT7+b/uf57vdZH+Vf1/9J6mHKPmn9O8tfG5/q8hPiP/L5x/T/nF/7frd/pf+69gz9e/Vb/7/YB/hP+96jf3E/ej3ev+p+5/u//tX/S9gn+1f8D/3e1v/5v///4fhJ/zH/e////j+A/9zv//7Rv/u/e3///LD/gP/P+9PwR/4L/t/////+4B///be/gH//6sfxD/lf7X0t/Hf6b/bf5v8ifVX8o+5/3n+P/dP/J+7TpX7Xf/P/ceqn8//M/8f/HeoP/W/0f+s/br1z/O/5j/o/5j2Dvy7+i/8D+/f5r24/wP258nfZP+x/8P9X7B3sr9k/73+U/1f7ge6J8x/0f8d69/pH+L/63+O/MP7Af5v/Y/+l/kfb//U/tB5kv5T/d/+P/V/5z5A/6F/h//L/kf9P+5/0sf4//1/3X/D9XP6D/uf/t/ufgL/on+B68npYlaLDClEN2OvMMpGV9kc+E//lXcCXA0pb4GW+8Ni18lLfAy33hRUqxi6A+/Z0pLGLFryURIEbVtD7BTtKUh9QnQhzb9LABdUEPG7eMLN6ceNnfzuXpLhnfXuOxBvBf1GpkiyCj2HoCRO4fZDNdeAdpupvm2jsaQppz5/d8cUWtOy0zYfjzqNOnsjd1Ll0wsvdgOUmWCMmrpDNA3Q0q7gtDoAJa9MszVpxg9tQj1f7m1oRW3F4Yt9j69KkQvzpYDhhCsixgCld7UeISwjrp8hLGqhuZsOitnUSN4dgoEowx+hYbFrzaJHT+Hinvxa/S5YLl9swIn2jKxiJLXhIFX5MVrPQd7KByzPKfW5rCd/WcMRHQ/yo1+RYO0XMPP4Nyi33y5WQklgsGf+MXVWFduynDVSE2DkOjX6oc9P7pWzNOQPJL5M0R5Pi7eiGU018YOPZfHlFSWQqLDAotj/k2R0N1vonrk//X+t/2AAimJ5h9w+cBEi7tSCG8yVPlYfMPcL51hkH4zhBS1GGx19qiLcbq3J08N45EOf/vUJDZRaKFaUUeXU3UZ5XeTUyQJA0poR9pUY/fHIcgRx6oXdD6EkT3MDooKCHOutk/v0cn/v9JnICWxmyPG3bzMbwXcmS56l7f6vEQMY+0Ybs/I4d8OQGj+lbDNCdjAPpr69oEOAr9T08NkAnvhVYFMV0bJQu7u17785C8o5d7mfGI4mDQ/lcznImKOhr0h979AbChAW/ks+C/HXB97RU6zMroGTn0E5FF4E7aD1R7tlqQpQ5K71s4OSf5JNXwGFyAV0rtGOwFTKklTwFWYJJMxo2frWOS5RbuGraCR52PBCDPVvPXCl9OAzWMsVYmZvRGdfMMVLuYscnj6RfzoGLuCK5KE08jO5H9lK8lXkhtYZwaPtB046I0Yu2vw+mNURLDmrFYB7bNnZcXRadeADolhv6q1trsbMz/t+4zGX3N8Xfcvu5BqQMI91u9hum8g1MHjoAJzsfGUJgxYQxwutdWaX036Ch9U4jivZ/e8hYYAdzLIGXsjN94pcEp0lr0Nyk/BZoS5HBBsf06CjUzqSuJi6rjCED0Urdhh2W2/+XyDnu4BEnI3Q4U8B1ne5h2ZDYR9r+M6FwrjZmzJpHJ7IHaj2oxx0Dl3WLLUke9t/2URWk827A/jOJWdng3sJ5AJtYUtPy3InVq2C6lcX37j3scUjpsk3+CikdpQRbQ2T5h93LKw6HV7Iu9tUtlGfEN0G78tg4G6gwqDcyiebrrgLDa5FPoIVwj6/MRZfdW358tg2KmvTx1Tsd0GwPEYBg2tjwTJOastZg3lNrSQqZFyRP4g1iR7MyAcAwKLF3hUijXEeX8SE50w6GbXVujdqcsdOKKUGBMAhzbYUzafy4QEGd6jce6yUZ8pcJQiZ8BixG/03AebvPDRtiYhJUaombOOb9D64ytIfsNwgQNloluce64Na9DDycamjS7s7sgNQRN8iv891nZhXB+vtgzXItMrRPLR76fX5tHg3Rkhb206UUkvaF8TeAQ3GSNQVPUtwg2qCeeCHYGnrsHeCFx9YQ9AeOUaF0x/+oqaXBQVIq+kFnRcgtIBFIvRv+ODPGVTNMtMlzvflfFnyngeOzeLj7b99QzP7TxlJdMnMeapMW3HaGHs69CmS0tAGiwbr525GTw5UIrFmahuhuD0KornuGWrFEYIewZ9H9RoIGva7jezC5Ll9p2yJKXpUUpULBAbGtspdDplyVtadUvC4IxcO2Hb+49fTw1/Jw4pOepL/TMNLUFiuRROV4h7chxnkx0N0aocFJxoZCa943meP3sLjWO8jWCCLooCteDi/tX1l+A9PgF165s5uFhaaXgiZYGgxWSXuPqs2IdmNlUEUkpFu1dN+HGqayMPGKQVRjAyNjj2Byja560CxmVD/CcYaUyRkPUNxtgySsHQ5GHsOT2lftnaZT1uRFSJs+1Va5dNZ6h0Qs5mbTog2XyPwL0IucZA/hu0i81yiLN8jZa4PMhwrPnmAVn6uMztM4v8TQtdznvG86J5iJRb6W52CYonhPh41fnGVbUiM7YCiF+wFrsQHE5ju6wsRO1yJsbgC8DB13cJXX7CNSVFyQWDMTnTrreyNRwKPKUawuEcXgmTacc5UXk9odXFQsvBPwEfhN6slqbTx4LhyqXjR/LJrmiP7FTFd9sZgW0PXeiMrFMf36mWxRYmv+XUGc4CjmtCx8Y6zq7h/whf1GjgDRbGRMhFanWj57//Uqsm9pAj2Y/pcTOzuKojOVs4B3nU5O0dToFSajxh3SxvOoOxN5oU6uK9cbfMIvSDI2dIgJ80gYRqvfzTfTsHCr9PFjW/0DlaxC3ZMt2pOFwmqKX0YISSWIus1fq0wBNkirGdYujP8F+E4uVyF6EtdJ5+/34X83zemLVd9l6+pG79G5rL2XeFm9jpNwnJaRV4d50I++I2ASbuh9T03kVGIyf3FyuU/msFWOlr4E0An8dq5f8kM08I0MrSnucdeTVL6UeKMRf4pm2tj0dP1EI0KHWMqq5y+cnBP/V2yVPB6FUcfAv89H767c6Ev4aPhGy/n1ff8T+tz7daMY0JnHbX3+MtcRFWkhs2rfq9u0hbbyY7cy8K/rRVZ6bXX6/breooi2ieIzOl7Lx/OuNIr8semXwr5Lkh2JzxzNXxj/CGvLvRMXVaL+Pik2xnQleEsJrbZ3wjaMpZDrs73PJSadhIfhvsaDIMAcjxGnbNsQbpxFkanvrjW26h0rHTfeOR4lYcjaCaaojzOuyAN46/C50/yM7P1N7BxMEm1ORmNlG1fTCNSs9XFwkKLEAr2cHOOGXbP8WovMJ+PwzgdRmimwsMabfMRMA4kgV1uPO8YdKX3NgKO9x6GQdF0Kcuuj/eF6VaMT3TZ5kwsl/PMj+Nl02M38DJ40RJnZHJxJVEoxsJLZ/vaL/r+KF+yDqSbr/G4v7uxiiBZlLfd2EfGima+/EzTO4Z452uAy2GWn9Ch5WARDxQPeeaVf8bDfTIYMRMF9WMMJbx7G1y5fcObrxDIyo/YmfUS5upNTU9OOfItFh2utoWSFnEe5K6MQzs0MrnU1kEFbmMo6mRzNkUyCY9rxBNTvxXW6QML/qcG5EEEi3tfztHPySNsyrbilcP+DtZ/JMnYbglMRpVYeu9QrCxNEXXRZoSCOe6pNn36YGz1T6k/plWFebRtjqbQSBnKJyI5/u9/iwt4Dv9yrKcXMDwvBfuG1KtAoM1VQ6vhHVcOlSxsIn+nofk3Hzmt/8BGP/BWvZo1UY5KBnBRIPY1r6tGkMKnB6Iah3C2N8jxHf+MNx5lH0HzwsE14OV3meHazlywQ2Fy5mfVTvDvVyQ8o4W7oy6Abl48+iCExREEmNFN03QP+msaV0UZ4/ws8DUtehbtxVGdH73G8/EcBKNrzmcuCR8dv7COaZOSax5VsvXIL/Dk1Mc+VfkY/EHQXaWdHHYnd17Y6mV7TpnvBoSY4/RAq+bz+ORo+7oUSIot0Ip9YBqMEARsgCYbnKbjyePxbNgcaD27/7i35WnOxQCy2WXFif9mcvaY+wo4mokzAogSkmaLOqMSEQTxCqxuzmJTkvgLlIP4VXXPvA3YDprwfp4boovn2UXVCmS/56FYIeNbgQ3yGwIdjBbUATMAVJohPsm8WQOk1q4Gy2ra1VDvePgiT2KSyrUB61XBKOUn4AQpOBHICQNBkycWyeVCYR0W54ppZJdg5mU4IhFb9WGuXI1eXob15mTVWa0kmIF8iNH/s+n1c7fCkRcO2Gt1awhzF7FXlk9AIRhJ+lGVn0uVSfATZVu0YQsWOXgcbMc5RL+ytuzE0zgG72i9DlOTktCuu5QGyUa9Cx2zN5KWnskJKB6T3ES4OaejD+g+H51kgosCJqb73s8ruc2s2o6d/S5zQj7ZdluYDcYIxbLjKpeMyOE0G3+zSumfjc/3Zo1ry6Oq5nq26yRPVrPKTOIfTLfq8pJKeu70QnEmHRykbK9wZyZLJj7ArqGM23p74yrX3T5G5xHYq5u+FdjQ5Hc15ndw41B+eU2FAicKIIUnzUDj1b1B0HyOMT28fRSvHD3/tVToYonqmt7N39dMmhjv2qppvf8lGtiOdVNjiiHx9FJUrlvoBWFUl+jB8ze4eSczA8FJ8TwZCK220YUF4lVQ8n9c/sqdhr425C0wzLVEmRhEWGxczvgZhXiw2Lmd9VzN4bFr5JjgybvP9CiRCq/CVrd0lBXrZRzZloZvD+BZr7j8H2yfruWrGtKfl+H+BUbl9/AzYlq81PIUHT/qc790CIl4Bem47rwfO33JylvgZzLYQwRmXhsXBGEyUCa8JRZFDILUaSpgAR5PArMN4lgB7uxc9RLWba29uor/1bSBLC95QECd9Gtfgv4mhIOqTc2TVEZgDBMcgvy5WjhYiUrFsL82mo0EyqETTSRfZ7V8cEslLfAy33fchVJF7NuBmGfBGzK+oC8tguqlKmBoNpBobsrSVrqfaZpw7e/o1B8HKf5az00K+/S7TAtVkFuy0cxMYAsVB8ZNPZs3AFlhC7qJ/UySrSedc75hRU5Gn7J8JmIPXNHIg5uMDFtfwzh6Ak3V0ks7sBiLZbG6PlWX9gx0IkxiqJbjzTvk9PoBA0n/Bv9ysWvkpb4GXMPOmVZG93/PhxGKzn5pNjl17XUWiXd++zJm4jCrMGJ+V2igjgB/xWzY/gLP/yvmHmRV0lscDePrCXITvACnsJHynwPx0Vgk5Wba8LVPg/ZCiJSPR/ofuoaDdErVhRycmicErGqgHDKGAa0DUAi1qDsWUqosWvkpb4GW8NhLtKCe6F4FHMI1gwxCbESx69mocZnEOURsJattoUnRl1BQC3P/E6sJI+b8LWxuigIiNx0HtdJv1BQZd4AWtdq5ddAd+Bpm7XyVJjKKAgpn//P0ocgZFpKhg4rn4WrkK0FOsHYE+w2BPPYKEPawOZLoWWRx5+GjIssfqQPuzN6YkJKDn0MudXa1EuiYUovNFY3TBFXAcRIiSB7sv6FG9T9+jGHcF3dV7uLl18/UCw2kAOD3GxYa/4fjCxi3wMLq5xrH7xOJ3jYIUUgTiFzlaVn7geD9vJ1B4D3dA0aU5P5SpM857cywUKeWBsWxaye642U4UNU1VwJs+zci27/OWPcdkkdJ5G0o6mLiVNcWjA1OGmPoqpNPkhvVdn7gaLnykMWLXsQ/jDXyUvJkibvn/1n7BNI3WXyPFLhHI6snUxxJ1OH1vGwVLUQL6FpAAarov4l27pHr81wKpTAiVUJ2yjDL8RQ22jdKRLZXVJ5gM4S4CyYhNWeGMDjMaS68NNtKWRGzgQsZAefPNV6/YW+Uw0IlusnglzaYWaLlcqNuJ1pzCZMh8i5kQGu5eHmiVA3P/Q/Tq99osnHwX2th/hoUFWrSmp5XAA46w5ZGr/g2q+QGf/gWDiiGRavtm2C8H/ajq+m6pElxeVjt98DLFTCiDe7gqLxZDWtBSHIkIST5mzu9DosNQAJ3ZrniIZ0xeewEAqL5L74qJVUaXrPU/3OMo9Sy+ZZlzqYOMOLIoDCEmGZagzhfo7bqFYHXS9AFQQ52NLBOC600UmtVPycDjCZ/asQYYHBB4g5kK7hJ92fkRJsv/pMNbx2IzVasdmevaGe3CZn/SSa3mqWWIKaZ9kJuSKluSg2oqIKf7KEYU1GiM2pXt+Ku7vcgamaCEEk5XAOZra/OoxwRhzO9wiHy5DjRns/5N5Bdzo6cIzx3uWo6L63HbtO1tMj2Ign2BLHFWAFge9JKz4kC7r+tcpX+OIMaMQwSXlGwf8zU3Q1OtRVOpVtCgQWChfO77RZsKMHOGr3v4XjFg/xyiPTmXP8jDlSXGTlsQc8RSxlaTxHJWLKRuBoiLjaGDvGVX5NlZjvlWGmnNediOt2Csi5gG47mrEn5A0hlvl2AjpYLVMdNADcw3j0+pbVGjIhL/fIDiI1BF4F9nGi4dluG++ufOVE8bgUDXCTOf4jtrvuYD8hR2oOBr4I+XPgXTYhFeVXrgPcE/xbmmN6a8j7uO6isl94jNNVO4Tf+0BKP78K4wFVkTc/FlQgowxPMq0Avo0XMlh2/EtzY+ivVPUISewdQaYSitJREwGsbHFTlbn8LkhAbfHg1dJZJp9oX8RgftEP3QT34z48giISqNalFYmtS5nqe6dXTIQTZjL4vDQKJgCT3vA3FLpjmaA9a8/1Crdhp4GMLqq+SlV/Aw0G2KugEf0yP784AvpsH3pEe6mSSSFS+jrmG2vsp/iS3qVHOq3/KuqPpwfsyj2Fr2Q54PAYmu7ZSJv9hRb95e01oXa/yg93buN6FTEBF47LolUR29urtc/XqEeuHhIhYaQLmsg9rlu2r24aMIQydH7pl1fHYPC+0L6zaJA6xBuUXMPTfDXnHJzEWqX3xhkV32HhdtZa5o2UEe7elklg9vA+He/pf+Ss7IwuKfVSPVWDMYtYBgy37DJy8BJnOuCCSKGUaQRlDMi/4GW9EJUEZl4bFr5KW+BlvvDYpdwWX/Iqyf0FItMN5htxD3oFdmQBYI3VwyUt8D1W78cx0LvDYtfJS3wMt4eLPOKF9DwpycWDQmHPspeNlbS5BCL3oLuVXin+0oU1nZMkHgNNbn9ciloemt7Vq4KJgKCRxp9t9FKwqgJHpQNFT59s5QwjSpWFct9FKwrlvopWFct9FKwrlvi3Ag7FHSBKEMykp/i8NR4LPGgSSIWoxbfBk2ot1Bp4YveAg4wKL4GmoGCpURxZokFhnEwaRTpjsDyQwq8DlD3mXcOYkZ5uoWWmA8TdQCeNVSeXVvJIMs3iqhQmp8kUR9fQl7LBV4fsWBsc9EXyuBzXPbrmcPgxIHCuSYempWp2n6R9toqKxAB/0IvzIRZa/JPOXQUveHXu3ZOxQhy6kICnVLAFezy+DwzmNNK3V448t3Qd5gjrtRTRMBBDgYwgzfAiOyFJfTQKv1h+0c6ogJ9zhWUaVcfEkK7Oh4Oc+tcLK7sHbCEZovNyyzfDXR2etya1utBxH4k+ON47lRuxyBG/ZjX2JwjlF7cax3hFqy7++zkkah4+fWexLS6pqIND/V3QJuS446nVQ+L5gPpp2N4Na3XASLqkpYJZbAz96Ruv7Ud3LuWKKH91CRpVaugIfOhFyf1M1aEslC+OxI8JFkDJLZ5UAiVqgGvAih9TqQVBAJBB7e7E0MSrQLD5UAoJZAfzMqpOVO36n959yFD21OLsdciCw7Sh0qghouFC/6tJ41IqxmvXr93chkMb2A8+6Mp8kG7qO+4fjaR+s6NSO6BDHI/xYEGu+ZRKyMpcxa342ofosYEUMnLMgE0yrmnilWaFXzyXY6eDzySgmkQdN+MHRbb/2AzZh7Q/9Tj+aOIjnBgmdreOcM82z9V0w13zNGHXQNdFMwWQd5l6OBtWJEGqrAHtnTk/4uIERezrU8Sca+KiuOrkwEj45Oth/Z0Sbd0rH/KZb2uRZ6Ho6w3MqQde7c6kTNmLMsdBlR8lObU41Z0dKML90pTYqIP6qjQEzvd7yJ/Y83bo4WP5QNZdQTpEZtcmaMB5HDNo74TgiD3u84Jo8CIdNuaT5ztIAOJRSsh6GMuAOPM9Hrs8FxxJiOq+hRapigOVs2f37R3T/QB4DN+UAZYs4wU1cEjwmeK+HdmDHARYgvoJCC/U9rM9M0KsR+zoiDJu+5USbuwOt4GNdOqFA11aKPuzDD8M+3Pmwj9RyhAtdZ5ITfIB2wyvS9HrvFCnSEK88RJIhQ93+kGyqyFkyVtjAw6kBd/L3SY1ML5R8kPEkvf4kCOVF3oG0cwQV6O5Ie+LcGils0SgazOGnBweN70rEO3Pne83hg3bC58yhA/X2UJIe1pW++mY01pAVNc88B2g8+/dbFGGhtMIy33SVOcfKbmp99a8+u/ZftD9UTl6G/eg/1v6l+STWtxuCvyCydbNloYGRFxvJeW0QglOh56/FHK3R1BJmKmajxaZnD86+Bcnohsn7aGyD4Sit0mAa9ApmMPWHXxI747XKaTPDF3Cr3JdludxMJn2rN5eveQ+qU+R2wpLPlwdFm3Qmzp5LX07HUuADT6BiaQu2XJl0NLhv5Q7pMHkyP4eY6eQfBc3zRDFM7IUxT2MI4LYyZbdN6og2rKsbXMFF/x4MABvCM+/Vu/W9wiAXY+83+f4Or2Pz8qvY5oBa3Ua3HsxQWfJogQ2TQdOnutl2MwtN0DASmSHCBlA5dZhDeapgdrlHUz6piOWAaHZyd9jdc4LKqUgwsWLHeQnyVT3lNwDUo+OXOFduwk+9kzZIG8QLLsd3TOd/MYCD5f4Ql2PvJ71lNKtOn0uzRcvKBI1AJJ63QyWtlPjj+OT5fsywmb+IVRRMoYWyN2gdz+A0+vKLHwA3huX4MLTjH7WFRfOA3EUUr24shVkixS67Rx99QV58WJKbAtLbTCBOIdceheN1W3g/YnzyaMpImgz2CLO0W8Iy0hZhw5sU8DhNPi3itf7H4r1sjXv3ItQwuKyK5EWJS3LDFXk5GyCKivmr5mXEe1dvb+KNTXGXTkF+1CGwoBpGdDBQ+G8/thxWEXTJ3NzgGF5TBcxT/ESEPXJrhnBu0kt9X6H1U6IWTRSbybu2mlx9q+BfKnNhZyNp+CFwqiSkIQvyeB81uoAMta+Xvxcv/dQb3guwjupS+RarIQMtssz/REjWnF5Z6YrlgXb1fKc2hVJQbl+qc63cLM1mpPyx0NTYi366IikJ36FzIISednx7A/FuZTd1fwGH4jW99yzTjnRZWixd5B+X7KEyz42PBOtZfsRD9rVVm330oEbI7fIMVzr9l9r4HDmKJljC87OYPCLO/st5pyjh6jVGabBBcm1qyuDrfm95Ot+fSfKzEKBK1uYFp9cknyDf1eV2FCosWWOKbM5Zq9j+7gaPyVdFHGfimK1aSwpBYSDdUe2zV4bo0/O4H+HP8/qM/8eIxcazwg0UtaxAJ46voWHYtIHUhM8CYBbj8jozWuKe6DmSEN2dp/dhD7n5q6UzJMASggziESlg0ee8tl6H1nmNlrI6YvOGj7+TDHyuOGUqPYbyJPzVTdtQo/FufrM8MxpcoFMcLwoofiM3YFMMXMDoFZ44Yrg58Dxmq[... truncated ...]";

const PORTFOLIO_DESCRIPTION = "Explore Neloy Digital Solutions web design projects for construction, landscaping and e-commerce brands—responsive, SEO-ready websites built for leads and visibility.";

const STYLE = `<style id="nds-web-portfolio-aeo-style">
#nds-web-projects-2026{padding:72px 0;background:linear-gradient(180deg,#fff,#f6fbff);border-top:1px solid #dcecf5}
#nds-web-projects-2026 *{box-sizing:border-box}
#nds-web-projects-2026 .wpWrap{width:min(1120px,calc(100% - 32px));margin:auto}
#nds-web-projects-2026 .wpHead{max-width:820px;margin:0 auto 30px;text-align:center}
#nds-web-projects-2026 .wpEyebrow{display:inline-block;color:#075DFF;font-size:12px;font-weight:900;letter-spacing:.14em;text-transform:uppercase}
#nds-web-projects-2026 h2{margin:8px 0 10px;color:#0A2A5A;font-size:clamp(32px,5vw,48px);line-height:1.08}
#nds-web-projects-2026 .wpIntro{margin:0;color:#60758c;font-size:16px;line-height:1.7}
#nds-web-projects-2026 .wpGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:20px;margin-top:30px}
#nds-web-projects-2026 .wpCard{overflow:hidden;background:#fff;border:1px solid #cfe8f6;border-radius:22px;box-shadow:0 14px 34px rgba(10,42,90,.08)}
#nds-web-projects-2026 .wpImage{display:block;aspect-ratio:16/10;overflow:hidden;background:#edf7fc}
#nds-web-projects-2026 .wpImage img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
#nds-web-projects-2026 .wpBody{padding:20px}
#nds-web-projects-2026 .wpType{display:block;color:#075DFF;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
#nds-web-projects-2026 h3{margin:7px 0 5px;color:#0A2A5A;font-size:22px;line-height:1.25}
#nds-web-projects-2026 .wpName{margin:0 0 10px;color:#173357;font-weight:800}
#nds-web-projects-2026 .wpDesc{margin:0;color:#60758c;font-size:15px;line-height:1.65}
#nds-web-projects-2026 .wpKeywords{margin:13px 0 0;color:#52708c;font-size:12px;line-height:1.5}
#nds-web-projects-2026 .wpLink{display:inline-flex;margin-top:16px;color:#075DFF;font-weight:900;text-decoration:none}
#nds-web-projects-2026 .wpAnswers{max-width:900px;margin:42px auto 0;padding:26px;background:#fff;border:1px solid #cfe8f6;border-radius:22px}
#nds-web-projects-2026 .wpAnswers h3{margin-top:0;text-align:center}
#nds-web-projects-2026 .wpQa{padding:15px 0;border-top:1px solid #e5f0f6}
#nds-web-projects-2026 .wpQa:first-of-type{border-top:0}
#nds-web-projects-2026 .wpQa strong{display:block;color:#173357;margin-bottom:5px}
#nds-web-projects-2026 .wpQa p{margin:0;color:#60758c;line-height:1.65}
#nds-web-projects-2026 .wpClientFeature{display:grid;grid-template-columns:minmax(240px,.72fr) minmax(0,1.28fr);gap:28px;align-items:start;margin:42px auto 0;padding:26px;background:#fff;border:1px solid #cfe8f6;border-radius:22px;box-shadow:0 14px 34px rgba(10,42,90,.08)}
#nds-web-projects-2026 .wpClientCopy{position:sticky;top:110px;padding:8px 4px}
#nds-web-projects-2026 .wpClientKicker{display:inline-block;color:#075DFF;font-size:11px;font-weight:900;letter-spacing:.1em;text-transform:uppercase}
#nds-web-projects-2026 .wpClientFeature h3{margin:9px 0 10px;color:#0A2A5A;font-size:clamp(25px,3.2vw,36px);line-height:1.15}
#nds-web-projects-2026 .wpClientFeature p{margin:0;color:#60758c;font-size:15px;line-height:1.7}
#nds-web-projects-2026 .wpClientMeta{margin-top:14px!important;color:#173357!important;font-weight:800}
#nds-web-projects-2026 .wpClientVisual{margin:0;overflow:hidden;background:#f4f9ff;border:1px solid #d9ebf7;border-radius:18px}
#nds-web-projects-2026 .wpClientVisual img{display:block;width:100%;height:auto;object-fit:contain}
@media(max-width:900px){#nds-web-projects-2026 .wpGrid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){#nds-web-projects-2026{padding:52px 0}#nds-web-projects-2026 .wpGrid{grid-template-columns:1fr}#nds-web-projects-2026 .wpClientFeature{grid-template-columns:1fr;padding:18px}#nds-web-projects-2026 .wpClientCopy{position:static}}
</style>`;

function escapeAttr(value){
  return String(value).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

function projectCards(){
  return PROJECTS.map((project) => `<article class="wpCard" itemscope itemtype="https://schema.org/CreativeWork"><a class="wpImage" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="View ${escapeAttr(project.name)} live website"><img src="${project.screenshot}" alt="${escapeAttr(project.alt)}" loading="lazy" decoding="async"></a><div class="wpBody"><span class="wpType">Web Design Project</span><h3 itemprop="name">${project.title}</h3><p class="wpName">${project.name}</p><p class="wpDesc" itemprop="description">${project.description}</p><p class="wpKeywords">${project.keywords}</p><a class="wpLink" itemprop="url" href="${project.url}" target="_blank" rel="noopener noreferrer">View Live Website →</a></div></article>`).join("");
}

function clientFeature(){
  return `<article id="bzd-labs-client-project" class="wpClientFeature" aria-labelledby="bzd-labs-client-title"><div class="wpClientCopy"><span class="wpClientKicker">Client Project • Healthcare Website Design</span><h3 id="bzd-labs-client-title">BZD Labs Healthcare Website Design</h3><p>Designed the website UI for BZD Labs as a completed healthcare client project, with a clean, professional medical style and user-friendly layout.</p><p class="wpClientMeta">Client: BZD Labs · Industry: Healthcare / Medical Laboratory · Role: Website Design</p></div><figure class="wpClientVisual"><img src="${BZD_CLIENT_IMAGE}" alt="BZD Labs healthcare website design client project by Neloy Digital Solutions" loading="lazy" decoding="async"></figure></article>`;
}

function projectSection(){
  return `<section id="nds-web-projects-2026" aria-labelledby="nds-web-projects-title"><div class="wpWrap"><div class="wpHead"><span class="wpEyebrow">Selected Website Work</span><h2 id="nds-web-projects-title">Web Design Projects</h2><p class="wpIntro">Responsive website design examples across construction, sustainable landscaping and e-commerce. These projects show how service structure, brand presentation, customer journeys and search-friendly content can work together.</p></div><div class="wpGrid">${projectCards()}</div>${clientFeature()}<div class="wpAnswers" aria-label="Web design answers"><h3>Website Design — Quick Answers</h3><div class="wpQa"><strong>What types of websites can Neloy Digital Solutions work on?</strong><p>Business websites, service websites, landing pages, portfolio websites and e-commerce experiences can be structured around the brand, audience, goals and approved project scope.</p></div><div class="wpQa"><strong>Can website projects be prepared for search and AI discovery?</strong><p>Yes. A project can include responsive structure, clear headings, useful service content, metadata and structured information that help search engines and AI answer systems understand the website.</p></div></div></div></section>`;
}

function portfolioSchema(){
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Neloy Digital Solutions Web Design Projects",
    description: PORTFOLIO_DESCRIPTION,
    itemListElement: PROJECTS.map((project, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: `${project.name} - ${project.title}`,
        description: project.description,
        url: project.url,
        keywords: project.keywords
      }
    }))
  };
}

function enhancePortfolio(html){
  if(!html.includes('id="nds-web-projects-2026"')){
    const section = projectSection();
    const marker = '<section id="logo-design-projects"';
    const pos = html.indexOf(marker);
    if(pos !== -1) html = html.slice(0,pos) + section + html.slice(pos);
    else if(html.includes('</main>')) html = html.replace('</main>', section + '</main>');
    else html += section;
  }

  if(!html.includes('id="nds-web-portfolio-aeo-style"') && html.includes('</head>')){
    html = html.replace('</head>', STYLE + '</head>');
  }

  const descriptionTag = `<meta name="description" content="${escapeAttr(PORTFOLIO_DESCRIPTION)}">`;
  if(/<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/i.test(html)){
    html = html.replace(/<meta\b(?=[^>]*\bname\s*=\s*["']description["'])[^>]*>/i, descriptionTag);
  } else if(html.includes('</head>')){
    html = html.replace('</head>', descriptionTag + '\n</head>');
  }

  if(!html.includes('id="nds-web-project-schema"') && html.includes('</head>')){
    const json = JSON.stringify(portfolioSchema()).replace(/</g,"\\u003c");
    html = html.replace('</head>', `<script id="nds-web-project-schema" type="application/ld+json">${json}</script></head>`);
  }

  return html;
}

export default {
  async fetch(request, env, ctx){
    const response = await app.fetch(request, env, ctx);
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/$/, "") || "/";
    const type = (response.headers.get("content-type") || "").toLowerCase();
    const isPortfolio = path === "/showcase" || path === "/portfolio";

    if(request.method !== "GET" || !isPortfolio || !type.includes("text/html")) return response;

    const html = enhancePortfolio(await response.text());
    const headers = new Headers(response.headers);
    headers.delete("content-length");
    headers.set("content-type", "text/html; charset=utf-8");
    headers.set("cache-control", "no-store");

    return new Response(html, {
      status: response.status,
      statusText: response.statusText,
      headers
    });
  }
};
