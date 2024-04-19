import { useState } from "react";

import { useParams } from "react-router-dom";

import { TbMessage2Plus } from "react-icons/tb";

import { formatTime, reactQueryKeys } from "@/shared";
import { useQuery } from "@tanstack/react-query";

import { getUserDetail } from "../../api/loader";

import UsersCurrentStatus from "./UsersCurrentStatus";

import UserDetailNavigation from "./UserDetailNavigation";
import { UserType } from "../../lib/types";

import BannerImgPlaceholder from "./BannerImgPlaceholder";
import { useTranslation } from "react-i18next";
import { SendMessageModal } from "@/entities";
import { useAuthSession } from "@/shared/hooks";

const UserDetailLayout = ({ children }: { children: React.ReactNode }) => {
  const { id } = useParams();
  const authUser = useAuthSession();

  const { data } = useQuery<UserType>({
    queryKey: [reactQueryKeys.userDetail, id],
    queryFn: () => getUserDetail(id || "0")
  });

  const [openSendMessageModal, setOpenSendMessageModal] = useState(false);

  const { t, i18n } = useTranslation();

  return (
    <>
      {data && (
        <SendMessageModal
          isOpen={openSendMessageModal}
          onClose={() => setOpenSendMessageModal(false)}
          receiverId={data?.id}
        />
      )}
      {data && (
        <div className="w-full h-full  text-gray-4 relative overflow-y-auto">
          {!data.bannerImg ? (
            <BannerImgPlaceholder
              userFullname={data.firstName + data.lastName}
            />
          ) : (
            <div className="absolute top-0 left-0 w-full h-full ">
              <img
                src={data.bannerImg}
                alt={data.bannerImg}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="relative z-30 flex h-full flex-col">
            <div className="relative  pt-[25%] md:pt-[15%] ">
              <div className="bg-gradient-to-t from-gray-15 dark:from-black via-opac-w-10 dark:via-opac-b-10 to-transparent w-full h-full absolute bottom-0 left-0 right-0 z-10"></div>
              <div className=" relative z-20 items-center max-w-[1440px] px-2 md:px-4 mx-auto">
                <div className="flex items-center gap-4">
                  <div className="md:min-w-[128px] min-w-[112px] w-28 h-28 md:w-32 md:h-32 p-0.5 bg-gray-12 dark:bg-gray-4 shadow-elev-3 dark:shadow-elev-3-dark border-4 border-blue-7 dark:border-blue-7 rounded-full  ">
                    <div className="w-full h-full overflow-hidden  rounded-full">
                      <img
                        src={data.profileImg}
                        alt={data.firstName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-2 dark:text-gray-14">
                      {data?.firstName} {data?.lastName}
                    </h3>
                    <div className="text-sm text-gray-4 dark:text-gray-12">
                      {t("accountCreated")}:{" "}
                      {formatTime(data.createdAt, i18n.language)}
                    </div>
                    <div className="flex text-sm text-gray-4 dark:text-gray-12 items-center gap-4">
                      <div>
                        {data?.followersAmount} {t("followers")}
                      </div>
                      <div>
                        {data?.followeesAmount} {t("followings")}
                      </div>
                    </div>

                    {data?.id !== authUser?.id && (
                      <div className="flex items-center mt-2 gap-2">
                        <button
                          onClick={() => setOpenSendMessageModal(true)}
                          className="text-xs flex items-center gap-2 font-medium px-3 md:px-2  h-fit py-1.5 rounded bg-blue-7 text-white"
                        >
                          <TbMessage2Plus className="text-lg" />
                          <span className="hidden md:block">
                            {t("sendMessage")}
                          </span>
                        </button>
                        <UsersCurrentStatus
                          r={data.usersRelations}
                          userId={data.id}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-15 dark:bg-black pt-12 h-full">
              <div className=" max-w-[1440px] px-2 md:px-4 mx-auto">
                <UserDetailNavigation userId={data.id} key={i18n.language} />

                <section className="mt-2 py-4">{children}</section>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserDetailLayout;
