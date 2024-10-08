CREATE DATABASE [MIDTERM]
GO

USE [MIDTERM]
GO
/****** Object:  Table [dbo].[T_M_PRODUCT]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_M_PRODUCT](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[PRODUCT_NAME] [varchar](100) NOT NULL,
	[DESCRIPTION] [varchar](256) NULL,
	[QUANTITY] [int] NOT NULL,
	[PRICE] [numeric](9, 2) NOT NULL,
	[CREATE_DATE] [datetime] NOT NULL,
	[CREATE_USER] [varchar](20) NOT NULL,
	[UPDATE_DATE] [datetime] NOT NULL,
	[UPDATE_USER] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_S_PROGRAM]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_S_PROGRAM](
	[PROGRAM_CODE] [varchar](5) NOT NULL,
	[PROGRAM_NAME] [varchar](30) NOT NULL,
 CONSTRAINT [PK_T_S_PROGRAM] PRIMARY KEY CLUSTERED 
(
	[PROGRAM_CODE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_S_ROLE]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_S_ROLE](
	[ROLE] [varchar](10) NOT NULL,
	[ROLE_NAME] [varchar](30) NOT NULL,
 CONSTRAINT [PK_T_S_ROLE_1] PRIMARY KEY CLUSTERED 
(
	[ROLE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_S_ROLE_DTL]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_S_ROLE_DTL](
	[ROLE] [varchar](10) NOT NULL,
	[PROGRAM_CODE] [varchar](5) NOT NULL,
	[IS_ACCESS] [bit] NOT NULL,
	[IS_INSERT] [bit] NOT NULL,
	[IS_DELETE] [bit] NOT NULL,
	[IS_UPDATE] [bit] NOT NULL,
 CONSTRAINT [PK_T_S_ROLE_DTL] PRIMARY KEY CLUSTERED 
(
	[ROLE] ASC,
	[PROGRAM_CODE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_S_USER]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_S_USER](
	[USER_ID] [varchar](20) NOT NULL,
	[PASSWORD] [varchar](256) NOT NULL,
	[FISRT_NAME] [varchar](70) NOT NULL,
	[LAST_NAME] [varchar](100) NOT NULL,
	[EMAIL] [varchar](100) NOT NULL,
	[ROLE] [varchar](10) NOT NULL,
	[LAST_LOGIN_DATE] [datetime] NULL,
	[PREVIOUS_LOGIN_DATE] [datetime] NULL,
	[CREATE_DATE] [datetime] NOT NULL,
	[CREATE_USER] [varchar](20) NOT NULL,
	[UPDATE_DATE] [datetime] NOT NULL,
	[UPDATE_USER] [varchar](20) NOT NULL,
 CONSTRAINT [PK__T_S_USER__F3BEEBFFC6887758] PRIMARY KEY CLUSTERED 
(
	[USER_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_T_ORDER]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_T_ORDER](
	[ID] [bigint] IDENTITY(1,1) NOT NULL,
	[ORDER_DATE] [datetime] NOT NULL,
	[ORDER_STATUS] [varchar](10) NOT NULL,
	[ORDER_USER_ID] [varchar](20) NOT NULL,
	[CREATE_DATE] [datetime] NOT NULL,
	[CREATE_USER] [varchar](20) NOT NULL,
	[UPDATE_DATE] [datetime] NOT NULL,
	[UPDATE_USER] [varchar](20) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[T_T_ORDER_DTL]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[T_T_ORDER_DTL](
	[ORDER_ID] [bigint] NOT NULL,
	[ITEM_NO] [smallint] NOT NULL,
	[PRODUCT_ID] [bigint] NOT NULL,
	[UNIT_PRICE] [numeric](9, 2) NOT NULL,
	[ORDER_QUANTITY] [int] NOT NULL,
	[TOTAL_PRICE] [numeric](11, 2) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[ORDER_ID] ASC,
	[ITEM_NO] ASC,
	[PRODUCT_ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[T_S_PROGRAM] ([PROGRAM_CODE], [PROGRAM_NAME]) VALUES (N'MAS01', N'Product')
INSERT [dbo].[T_S_PROGRAM] ([PROGRAM_CODE], [PROGRAM_NAME]) VALUES (N'SEC01', N'User')
INSERT [dbo].[T_S_PROGRAM] ([PROGRAM_CODE], [PROGRAM_NAME]) VALUES (N'TRN01', N'Order')
INSERT [dbo].[T_S_PROGRAM] ([PROGRAM_CODE], [PROGRAM_NAME]) VALUES (N'TRN02', N'Order Detail')
GO
INSERT [dbo].[T_S_ROLE] ([ROLE], [ROLE_NAME]) VALUES (N'Admin', N' Admin Role')
INSERT [dbo].[T_S_ROLE] ([ROLE], [ROLE_NAME]) VALUES (N'User', N'User Role')
GO
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'Admin', N'MAS01', 0, 0, 0, 0)
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'Admin', N'SEC01', 1, 1, 1, 1)
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'Admin', N'TRN01', 0, 0, 0, 0)
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'Admin', N'TRN02', 0, 0, 0, 0)
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'User', N'MAS01', 1, 1, 1, 1)
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'User', N'SEC01', 0, 0, 0, 0)
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'User', N'TRN01', 1, 1, 1, 1)
INSERT [dbo].[T_S_ROLE_DTL] ([ROLE], [PROGRAM_CODE], [IS_ACCESS], [IS_INSERT], [IS_DELETE], [IS_UPDATE]) VALUES (N'User', N'TRN02', 1, 1, 1, 1)
GO

ALTER TABLE [dbo].[T_S_ROLE_DTL]  WITH CHECK ADD FOREIGN KEY([PROGRAM_CODE])
REFERENCES [dbo].[T_S_PROGRAM] ([PROGRAM_CODE])
GO
ALTER TABLE [dbo].[T_S_ROLE_DTL]  WITH CHECK ADD FOREIGN KEY([ROLE])
REFERENCES [dbo].[T_S_ROLE] ([ROLE])
GO
ALTER TABLE [dbo].[T_S_USER]  WITH CHECK ADD FOREIGN KEY([ROLE])
REFERENCES [dbo].[T_S_ROLE] ([ROLE])
GO
ALTER TABLE [dbo].[T_T_ORDER_DTL]  WITH CHECK ADD FOREIGN KEY([ORDER_ID])
REFERENCES [dbo].[T_T_ORDER] ([ID])
GO
ALTER TABLE [dbo].[T_T_ORDER_DTL]  WITH CHECK ADD FOREIGN KEY([PRODUCT_ID])
REFERENCES [dbo].[T_M_PRODUCT] ([ID])
GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_DEL]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_ORDER_DEL]
(
@ID bigint
)
AS

SET NOCOUNT ON



DELETE FROM dbo.[T_T_ORDER] WITH (ROWLOCK) 
WHERE					
			[ID] = @ID

SELECT @@ROWCOUNT

GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_DTL_DEL]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_ORDER_DTL_DEL]
(
@ORDER_ID bigint, 
@ITEM_NO smallint, 
@PRODUCT_ID bigint
)
AS

SET NOCOUNT ON



DELETE FROM dbo.[T_T_ORDER_DTL] WITH (ROWLOCK) 
WHERE					
			[ORDER_ID] = @ORDER_ID		AND	[ITEM_NO] = @ITEM_NO		AND	[PRODUCT_ID] = @PRODUCT_ID

SELECT @@ROWCOUNT

GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_DTL_FND]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_ORDER_DTL_FND]
(
@WHERE_CLAUSE VARCHAR (8000), 
@ORDER_BY VARCHAR(200), 
@TOP INT 
)
AS

SET NOCOUNT ON



DECLARE @SQLSELECT VARCHAR(8000)
DECLARE @SQLFROM VARCHAR(1000)
DECLARE @SQLWHERE VARCHAR(8000)
DECLARE @SQLORDERBY AS VARCHAR(500)

SET @SQLSELECT = 'SELECT  '

IF @TOP > 0 
BEGIN
	SET @SQLSELECT = @SQLSELECT + ' TOP ' + CAST(@TOP AS VARCHAR) + ' '
END

SET @SQLSELECT = @SQLSELECT + ' [order_id],
		[item_no],
		[product_id],
		[unit_price],
		[order_quantity],
		[total_price] '

SET @SQLFROM = ' FROM 	 dbo.[T_T_ORDER_DTL] '

IF LEN(@WHERE_CLAUSE) > 0
BEGIN
	SET @SQLWHERE = ' WHERE  ' + @WHERE_CLAUSE 
END
		
IF LEN(@ORDER_BY) > 0
BEGIN
	SET @SQLORDERBY = ' ORDER BY ' + @ORDER_BY
END

EXEC (@SQLSELECT + @SQLFROM + @SQLWHERE + @SQLORDERBY)
GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_DTL_GET_BY_PK]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_ORDER_DTL_GET_BY_PK]
(
@ORDER_ID bigint, 
@ITEM_NO smallint, 
@PRODUCT_ID bigint
)
AS

SET NOCOUNT ON


SELECT
		[order_id],
		[item_no],
		[product_id],
		[unit_price],
		[order_quantity],
		[total_price]
FROM	dbo.[T_T_ORDER_DTL]
WHERE
			[ORDER_ID] = @ORDER_ID
		AND	[ITEM_NO] = @ITEM_NO
		AND	[PRODUCT_ID] = @PRODUCT_ID
						
GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_DTL_INS]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_ORDER_DTL_INS]
(
@ORDER_ID bigint, 
@ITEM_NO smallint, 
@PRODUCT_ID bigint, 
@UNIT_PRICE numeric(9, 2), 
@ORDER_QUANTITY int, 
@TOTAL_PRICE numeric(11, 2))
AS

SET NOCOUNT ON



    INSERT INTO dbo.[T_T_ORDER_DTL]
            ([ORDER_ID],
		[ITEM_NO],
		[PRODUCT_ID],
		[UNIT_PRICE],
		[ORDER_QUANTITY],
		[TOTAL_PRICE]
            )
    VALUES	(				
				@ORDER_ID, 
				@ITEM_NO, 
				@PRODUCT_ID, 
				@UNIT_PRICE, 
				@ORDER_QUANTITY, 
				@TOTAL_PRICE            )		
            
    
GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_DTL_UPD]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[USP_ORDER_DTL_UPD]
(
@ORDER_ID bigint, 
@ORIGINAL_ORDER_ID bigint, 
@ITEM_NO smallint, 
@ORIGINAL_ITEM_NO smallint, 
@PRODUCT_ID bigint, 
@ORIGINAL_PRODUCT_ID bigint, 
@UNIT_PRICE numeric(9, 2), 
@ORDER_QUANTITY int, 
@TOTAL_PRICE numeric(11, 2))
AS

SET NOCOUNT ON


-- Modify the updatable columns
UPDATE	dbo.[T_T_ORDER_DTL] 
SET
		[ORDER_ID] = @ORDER_ID,
		[ITEM_NO] = @ITEM_NO,
		[PRODUCT_ID] = @PRODUCT_ID,
		[UNIT_PRICE] = @UNIT_PRICE,
		[ORDER_QUANTITY] = @ORDER_QUANTITY,
		[TOTAL_PRICE] = @TOTAL_PRICE
WHERE
		[ORDER_ID] = @ORIGINAL_ORDER_ID 
AND [ITEM_NO] = @ORIGINAL_ITEM_NO 
AND [PRODUCT_ID] = @ORIGINAL_PRODUCT_ID 

GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_FND]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
					
CREATE PROCEDURE [dbo].[USP_ORDER_FND]
(
@WHERE_CLAUSE VARCHAR (8000), 
@ORDER_BY VARCHAR(200), 
@TOP INT 
)
AS

SET NOCOUNT ON



DECLARE @SQLSELECT VARCHAR(8000)
DECLARE @SQLFROM VARCHAR(1000)
DECLARE @SQLWHERE VARCHAR(8000)
DECLARE @SQLORDERBY AS VARCHAR(500)

SET @SQLSELECT = 'SELECT  '

IF @TOP > 0 
BEGIN
	SET @SQLSELECT = @SQLSELECT + ' TOP ' + CAST(@TOP AS VARCHAR) + ' '
END

SET @SQLSELECT = @SQLSELECT + ' [id],
		[order_date],
		[order_status],
		[order_user_id],
		[create_date],
		[create_user],
		[update_date],
		[update_user] '

SET @SQLFROM = ' FROM 	 dbo.[T_T_ORDER] '

IF LEN(@WHERE_CLAUSE) > 0
BEGIN
	SET @SQLWHERE = ' WHERE  ' + @WHERE_CLAUSE 
END
		
IF LEN(@ORDER_BY) > 0
BEGIN
	SET @SQLORDERBY = ' ORDER BY ' + @ORDER_BY
END

EXEC (@SQLSELECT + @SQLFROM + @SQLWHERE + @SQLORDERBY)
GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_GET_BY_PK]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_ORDER_GET_BY_PK]
(
@ID bigint
)
AS

SET NOCOUNT ON


SELECT
		[id],
		[order_date],
		[order_status],
		[order_user_id],
		[create_date],
		[create_user],
		[update_date],
		[update_user]
FROM	dbo.[T_T_ORDER]
WHERE
			[ID] = @ID
						
GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_INS]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_ORDER_INS]
(
@ID bigint OUTPUT, 
@ORDER_DATE datetime, 
@ORDER_STATUS varchar(10), 
@ORDER_USER_ID varchar(20), 
@CREATE_DATE char(18), 
@CREATE_USER varchar(20), 
@UPDATE_DATE datetime, 
@UPDATE_USER varchar(20))
AS

SET NOCOUNT ON



    INSERT INTO dbo.[T_T_ORDER]
            ([ORDER_DATE],
		[ORDER_STATUS],
		[ORDER_USER_ID],
		[CREATE_DATE],
		[CREATE_USER],
		[UPDATE_DATE],
		[UPDATE_USER]
            )
    VALUES	(				
				@ORDER_DATE, 
				@ORDER_STATUS, 
				@ORDER_USER_ID, 
				@CREATE_DATE, 
				@CREATE_USER, 
				@UPDATE_DATE, 
				@UPDATE_USER            )		
            
    
SELECT @ID = IDENT_CURRENT('T_T_ORDER')
GO
/****** Object:  StoredProcedure [dbo].[USP_ORDER_UPD]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[USP_ORDER_UPD]
(
@ID bigint, 
@ORDER_DATE datetime, 
@ORDER_STATUS varchar(10), 
@ORDER_USER_ID varchar(20), 
@CREATE_DATE char(18), 
@CREATE_USER varchar(20), 
@UPDATE_DATE datetime, 
@UPDATE_USER varchar(20))
AS

SET NOCOUNT ON


-- Modify the updatable columns
UPDATE	dbo.[T_T_ORDER] 
SET
		[ORDER_DATE] = @ORDER_DATE,
		[ORDER_STATUS] = @ORDER_STATUS,
		[ORDER_USER_ID] = @ORDER_USER_ID,
		[CREATE_DATE] = @CREATE_DATE,
		[CREATE_USER] = @CREATE_USER,
		[UPDATE_DATE] = @UPDATE_DATE,
		[UPDATE_USER] = @UPDATE_USER
WHERE
		[ID] = @ID 

GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_DEL]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_PRODUCT_DEL]
(
@ID bigint
)
AS

SET NOCOUNT ON



DELETE FROM dbo.[T_M_PRODUCT] WITH (ROWLOCK) 
WHERE					
			[ID] = @ID

SELECT @@ROWCOUNT

GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_FND]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_PRODUCT_FND]
(
@WHERE_CLAUSE VARCHAR (8000), 
@ORDER_BY VARCHAR(200), 
@TOP INT 
)
AS

SET NOCOUNT ON



DECLARE @SQLSELECT VARCHAR(8000)
DECLARE @SQLFROM VARCHAR(1000)
DECLARE @SQLWHERE VARCHAR(8000)
DECLARE @SQLORDERBY AS VARCHAR(500)

SET @SQLSELECT = 'SELECT  '

IF @TOP > 0 
BEGIN
	SET @SQLSELECT = @SQLSELECT + ' TOP ' + CAST(@TOP AS VARCHAR) + ' '
END

SET @SQLSELECT = @SQLSELECT + ' [id],
		[product_name],
		[description],
		[quantity],
		[price],
		[create_date],
		[create_user],
		[update_date],
		[update_user] '

SET @SQLFROM = ' FROM 	 dbo.[T_M_PRODUCT] '

IF LEN(@WHERE_CLAUSE) > 0
BEGIN
	SET @SQLWHERE = ' WHERE  ' + @WHERE_CLAUSE 
END
		
IF LEN(@ORDER_BY) > 0
BEGIN
	SET @SQLORDERBY = ' ORDER BY ' + @ORDER_BY
END

EXEC (@SQLSELECT + @SQLFROM + @SQLWHERE + @SQLORDERBY)
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_GET_BY_PK]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_PRODUCT_GET_BY_PK]
(
@ID bigint
)
AS

SET NOCOUNT ON


SELECT
		[id],
		[product_name],
		[description],
		[quantity],
		[price],
		[create_date],
		[create_user],
		[update_date],
		[update_user]
FROM	dbo.[T_M_PRODUCT]
WHERE
			[ID] = @ID
						
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_INS]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[USP_PRODUCT_INS]
(
@ID bigint OUTPUT, 
@PRODUCT_NAME varchar(100), 
@DESCRIPTION varchar(256), 
@QUANTITY int, 
@PRICE numeric(9, 2), 
@CREATE_DATE char(18), 
@CREATE_USER varchar(20), 
@UPDATE_DATE datetime, 
@UPDATE_USER varchar(20))
AS

SET NOCOUNT ON



    INSERT INTO dbo.[T_M_PRODUCT]
            ([PRODUCT_NAME],
		[DESCRIPTION],
		[QUANTITY],
		[PRICE],
		[CREATE_DATE],
		[CREATE_USER],
		[UPDATE_DATE],
		[UPDATE_USER]
            )
    VALUES	(				
				@PRODUCT_NAME, 
				@DESCRIPTION, 
				@QUANTITY, 
				@PRICE, 
				@CREATE_DATE, 
				@CREATE_USER, 
				@UPDATE_DATE, 
				@UPDATE_USER            )		
            
    
SELECT @ID = IDENT_CURRENT('T_M_PRODUCT')
GO
/****** Object:  StoredProcedure [dbo].[USP_PRODUCT_UPD]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

	CREATE PROCEDURE [dbo].[USP_PRODUCT_UPD]
(
@ID bigint, 
@PRODUCT_NAME varchar(100), 
@DESCRIPTION varchar(256), 
@QUANTITY int, 
@PRICE numeric(9, 2), 
@CREATE_DATE char(18), 
@CREATE_USER varchar(20), 
@UPDATE_DATE datetime, 
@UPDATE_USER varchar(20))
AS

SET NOCOUNT ON


-- Modify the updatable columns
UPDATE	dbo.[T_M_PRODUCT] 
SET
		[PRODUCT_NAME] = @PRODUCT_NAME,
		[DESCRIPTION] = @DESCRIPTION,
		[QUANTITY] = @QUANTITY,
		[PRICE] = @PRICE,
		[CREATE_DATE] = @CREATE_DATE,
		[CREATE_USER] = @CREATE_USER,
		[UPDATE_DATE] = @UPDATE_DATE,
		[UPDATE_USER] = @UPDATE_USER
WHERE
		[ID] = @ID 

GO
/****** Object:  StoredProcedure [dbo].[USP_ROLE_DTL_FND]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
					
CREATE PROCEDURE [dbo].[USP_ROLE_DTL_FND]
(
@WHERE_CLAUSE VARCHAR (8000), 
@ORDER_BY VARCHAR(200), 
@TOP INT 
)
AS

SET NOCOUNT ON



DECLARE @SQLSELECT VARCHAR(8000)
DECLARE @SQLFROM VARCHAR(1000)
DECLARE @SQLWHERE VARCHAR(8000)
DECLARE @SQLORDERBY AS VARCHAR(500)

SET @SQLSELECT = 'SELECT  '

IF @TOP > 0 
BEGIN
	SET @SQLSELECT = @SQLSELECT + ' TOP ' + CAST(@TOP AS VARCHAR) + ' '
END

SET @SQLSELECT = @SQLSELECT + ' [role],
		[program_code],
		[is_access],
		[is_insert],
		[is_delete],
		[is_update] '

SET @SQLFROM = ' FROM 	 dbo.[T_S_ROLE_DTL] '

IF LEN(@WHERE_CLAUSE) > 0
BEGIN
	SET @SQLWHERE = ' WHERE  ' + @WHERE_CLAUSE 
END
		
IF LEN(@ORDER_BY) > 0
BEGIN
	SET @SQLORDERBY = ' ORDER BY ' + @ORDER_BY
END

EXEC (@SQLSELECT + @SQLFROM + @SQLWHERE + @SQLORDERBY)
GO
/****** Object:  StoredProcedure [dbo].[USP_USER_CHANGE_PASSWORD]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_USER_CHANGE_PASSWORD]
(
@USER_ID varchar(20),  
@PASSWORD varchar(256),
@UPDATE_DATE datetime, 
@UPDATE_USER varchar(20))
AS

SET NOCOUNT ON


-- Modify the updatable columns
UPDATE	dbo.[T_S_USER] 
SET
		[PASSWORD] = @PASSWORD,
		[UPDATE_DATE] = @UPDATE_DATE,
		[UPDATE_USER] = @UPDATE_USER
WHERE
		[USER_ID] = @USER_ID 

GO
/****** Object:  StoredProcedure [dbo].[USP_USER_DEL]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*============================================================
Procedure:	 	dbo.[USP_USER_DEL]
Author:			auto-generated by CodeSmith using Template 'CDSLib2013_StoredProcedures.cst'
				by Boonsak
Created Date:	วันพุธที่ 31 กรกฎาคม 2024

Purposes:
			Deletes a record in the T_S_USER table

============================================================
Revision History:
Date:		By		Description
------------------------------------------------------------------------------------------

============================================================*/
					
CREATE PROCEDURE [dbo].[USP_USER_DEL]
(
@USER_ID varchar(20)
)
AS

SET NOCOUNT ON



DELETE FROM dbo.[T_S_USER] WITH (ROWLOCK) 
WHERE					
			[USER_ID] = @USER_ID

SELECT @@ROWCOUNT

GO
/****** Object:  StoredProcedure [dbo].[USP_USER_FND]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
					
CREATE PROCEDURE [dbo].[USP_USER_FND]
(
@WHERE_CLAUSE VARCHAR (8000), 
@ORDER_BY VARCHAR(200), 
@TOP INT 
)
AS

SET NOCOUNT ON



DECLARE @SQLSELECT VARCHAR(8000)
DECLARE @SQLFROM VARCHAR(1000)
DECLARE @SQLWHERE VARCHAR(8000)
DECLARE @SQLORDERBY AS VARCHAR(500)

SET @SQLSELECT = 'SELECT  '

IF @TOP > 0 
BEGIN
	SET @SQLSELECT = @SQLSELECT + ' TOP ' + CAST(@TOP AS VARCHAR) + ' '
END

SET @SQLSELECT = @SQLSELECT + ' [user_id],
		[password],
		[fisrt_name],
		[last_name],
		[email],
		[role],
		[last_login_date],
		[previous_login_date],
		[create_date],
		[create_user],
		[update_date],
		[update_user] '

SET @SQLFROM = ' FROM 	 dbo.[T_S_USER] '

IF LEN(@WHERE_CLAUSE) > 0
BEGIN
	SET @SQLWHERE = ' WHERE  ' + @WHERE_CLAUSE 
END
		
IF LEN(@ORDER_BY) > 0
BEGIN
	SET @SQLORDERBY = ' ORDER BY ' + @ORDER_BY
END

EXEC (@SQLSELECT + @SQLFROM + @SQLWHERE + @SQLORDERBY)
GO
/****** Object:  StoredProcedure [dbo].[USP_USER_GET_BY_PK]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

/*============================================================
Procedure:	 	dbo.[USP_USER_GET_BY_PK]
Author:			auto-generated by CodeSmith using Template 'CDSLib2013_StoredProcedures.cst'
				by Boonsak
Created Date:	วันพุธที่ 31 กรกฎาคม 2024

Purposes:
			Select records from the T_S_USER table through a Primary key

============================================================
Revision History:
Date:		By		Description
------------------------------------------------------------------------------------------

============================================================*/
					
CREATE PROCEDURE [dbo].[USP_USER_GET_BY_PK]
(
@USER_ID varchar(20)
)
AS

SET NOCOUNT ON


SELECT
		[user_id] ,
		[password] ,
		[fisrt_name],
		[last_name],
		[email],
		[role],
		[last_login_date],
		[previous_login_date],
		[create_date],
		[create_user],
		[update_date],
		[update_user]
FROM	dbo.[T_S_USER]
WHERE
			[USER_ID] = @USER_ID
						
GO
/****** Object:  StoredProcedure [dbo].[USP_USER_INS]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_USER_INS]
(
@USER_ID varchar(20), 
@PASSWORD varchar(256), 
@FISRT_NAME varchar(70), 
@LAST_NAME varchar(100), 
@EMAIL varchar(100), 
@ROLE varchar(20), 
@LAST_LOGIN_DATE datetime, 
@PREVIOUS_LOGIN_DATE datetime, 
@CREATE_DATE datetime, 
@CREATE_USER varchar(20), 
@UPDATE_DATE datetime, 
@UPDATE_USER varchar(20))
AS

SET NOCOUNT ON



    INSERT INTO dbo.[T_S_USER]
            ([USER_ID],
		[PASSWORD],
		[FISRT_NAME],
		[LAST_NAME],
		[EMAIL],
		[ROLE],
		[LAST_LOGIN_DATE],
		[PREVIOUS_LOGIN_DATE],
		[CREATE_DATE],
		[CREATE_USER],
		[UPDATE_DATE],
		[UPDATE_USER]
            )
    VALUES	(				
				@USER_ID, 
				@PASSWORD, 
				@FISRT_NAME, 
				@LAST_NAME, 
				@EMAIL, 
				@ROLE, 
				@LAST_LOGIN_DATE, 
				@PREVIOUS_LOGIN_DATE, 
				@CREATE_DATE, 
				@CREATE_USER, 
				@UPDATE_DATE, 
				@UPDATE_USER            )		
            
    
GO
/****** Object:  StoredProcedure [dbo].[USP_USER_UPD]    Script Date: 26/08/2024 15:16:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[USP_USER_UPD]
(
@USER_ID varchar(20),  
@FISRT_NAME varchar(70), 
@LAST_NAME varchar(100), 
@EMAIL varchar(100), 
@ROLE varchar(20), 
@UPDATE_DATE datetime, 
@UPDATE_USER varchar(20))
AS

SET NOCOUNT ON


-- Modify the updatable columns
UPDATE	dbo.[T_S_USER] 
SET
		[FISRT_NAME] = @FISRT_NAME,
		[LAST_NAME] = @LAST_NAME,
		[EMAIL] = @EMAIL,
		[ROLE] = @ROLE,
		[UPDATE_DATE] = @UPDATE_DATE,
		[UPDATE_USER] = @UPDATE_USER
WHERE
		[USER_ID] = @USER_ID 

GO
